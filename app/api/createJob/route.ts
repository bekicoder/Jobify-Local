import { NextResponse, NextRequest } from "next/server";
import { pool as db } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { franc } from "franc";
export function splitText(text: string, maxLength: number = 500) {
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    chunks.push(text.slice(start, start + maxLength));
    start += maxLength;
  }
  return chunks;
}

export async function translateLargeText(
  text: string,
  sourceLang: string,
  targetLang: string,
) {
  const chunks = splitText(text, 500);
  const translatedChunks: string[] = [];

  for (const chunk of chunks) {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        chunk,
      )}&langpair=${sourceLang}|${targetLang}`,
    );
    const data = await res.json();
    translatedChunks.push(data.responseData.translatedText);
  }

  return { translated: translatedChunks.join(" "), status: "successful" };
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("jobify-token")?.value;
  const { data: fd } = await req.json();
  const { detail, title } = fd;
  const languages = ["En", "Am", "Fr", "Ar"];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isValid = Object.values(fd).every(
    (v) => v !== null && v !== undefined && v !== "",
  );

  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!);
    const decoded = data as JwtPayload;

    interface jobDataType {
      [key: string]: unknown;
      id: number;
      titleEn: string;
      detailEn: string;
      titleAm: string;
      detailAm: string;
      titleAr: string;
      detailAr: string;
      titleFr: string;
      detailFr: string;
      posted_by: string;
      FrCategory: string;
      ArCategory: string;
      AmCategory: string;
      EnJobType: string;
      FrJobType: string;
      ArJobType: string;
      AmJobType: string;
    }

    const jobData: jobDataType = {
      id: 0,
      titleEn: "",
      detailEn: "",
      titleAm: "",
      detailAm: "",
      titleAr: "",
      detailAr: "",
      titleFr: "",
      detailFr: "",
      posted_by: "",
      EnCategory: "",
      FrCategory: "",
      ArCategory: "",
      AmCategory: "",
      EnJobType: "",
      FrJobType: "",
      ArJobType: "",
      AmJobType: "",
    };

    const isoMap: Record<string, string> = {
      eng: "En",
      amh: "Am",
      arb: "Ar",
      fra: "Fr",
    };

    const detectedLang = franc(detail);
    console.log(detectedLang,"this is the detexted lang ")
    const lang = isoMap[detectedLang]; 
    await Promise.all(
      languages.map(async (language) => {
        const titleKey = `title${language}`;
        const detailKey = `detail${language}`;
        if (language === lang) {
          console.log(language,lang,"this is the language ")
          jobData[titleKey] = title;
          jobData[detailKey] = detail;
          return;
        }
        const [detailRes, titleRes] = await Promise.all([
          translateLargeText(
            detail,
            lang.toLowerCase(),
            language.toLowerCase(),
          ),
          translateLargeText(title, lang.toLowerCase(), language.toLowerCase()),
        ]);
        console.log(detailRes, titleRes,"this is the translation answer ")
        jobData[detailKey] = detailRes.translated;
        jobData[titleKey] = titleRes.translated;
      }),
    );

    const insertIds: { [key: string]: number } = {};

    await Promise.all(
      languages.map(async (lng) => {
        const titleKey = `title${lng}`;
        const detailKey = `detail${lng}`;
        const locationKey = `${lng.toLowerCase()}Location`;
        const jobtypeKey = `${lng}JobType`;
        const catagoryKey = `${lng}Category`;
        const values = [
          decoded[locationKey],
          fd[jobtypeKey],
          fd[catagoryKey],
          jobData[detailKey],
          jobData[titleKey],
        ];
        const { rows } = await db.query(
          `INSERT INTO jobTranslations(location,jobtype,catagory,detail,title)
           VALUES($1,$2,$3,$4,$5)
           RETURNING id`,
          values,
        );

        insertIds[`${lng}Jobid`] = rows[0].id;
      }),
    );

    const values = [
      insertIds["EnJobid"],
      insertIds["AmJobid"],
      insertIds["ArJobid"],
      insertIds["FrJobid"],
      decoded.email,
      decoded.flag,
      fd.salary_range,
    ];

    const { rows } = await db.query(
      `INSERT INTO jobs(enJobid, amJobid, arJobid, frJobid, posted_by,flag,salary_range)
       VALUES($1,$2,$3,$4,$5,$6,$7)
       RETURNING id, posted_by`,
      values,
    );

    jobData.id = rows[0].id;
    jobData.posted_by = rows[0].posted_by;

    return NextResponse.json(
      { data: jobData, status: "successful" },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "failed to fetch user", status: "unsuccessful" },
      { status: 500 },
    );
  }
}
