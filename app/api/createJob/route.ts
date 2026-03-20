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
 const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  for (const chunk of chunks) {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        chunk,
      )}&langpair=${sourceLang}|${targetLang}`,
    );
    const data = await res.json();
    console.log(data)
    translatedChunks.push(data.responseData.translatedText);
    await delay(100);
  }

  return { translated: translatedChunks.join(" "), status: "successful" };
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("jobify-token")?.value;
  const { fd, editId } = await req.json();
  const { detail, title } = fd;
  const languages = ["En", "Am"];
  const isoMap: Record<string, string> = {
    eng: "En",
    amh: "Am",
  };
  interface jobDataType {
    [key: string]: unknown;
    id: number;
    titleEn: string;
    detailEn: string;
    titleAm: string;
    detailAm: string;
    posted_by: string;
    EnCategory: string;
    AmCategory: string;
    EnJobtype: string;
    AmJobtype: string;
    AmLocation:string
    EnLocation:string;
    salary_range:string;
    created_at:string;
  }

  const jobData: jobDataType = {
    id: 0,
    titleEn: "",
    detailEn: "",
    titleAm: "",
    detailAm: "",
    posted_by: "",
    EnCategory: "",
    AmCategory: "",
    EnJobtype: "",
    AmJobtype: "",
    AmLocation:"",
    EnLocation:"",
    salary_range:"",
    created_at:"",
  }
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isValid = Object.values(fd).every(
    (v) => v !== null && v !== undefined && v !== "",
  );

  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

    const data = jwt.verify(token, process.env.JWT_SECRET!);
    const decoded = data as JwtPayload;

  if (editId) {
    const { rows } = await db.query(
      "update jobs set updated_at=now(),salary_range=$1 where id=$2 RETURNING *;",
      [fd.salary_range, editId],
    );
    jobData.id = rows[0].id;
    jobData.posted_by = rows[0].posted_by;
    jobData.AmCategory = fd.AmCategory;
    jobData.EnJobtype = fd.EnJobType;
    jobData.AmJobtype = fd.AmJobType;
    jobData.EnCategory = fd.EnCategory;
    jobData.posted_by = rows[0].posted_by;
    jobData.EnLocation = decoded.enLocation;
    jobData.AmLocation = decoded.amLocation;
    jobData.salary_range = fd.salary_range
    jobData["created_at"] = rows[0].created_at;
    jobData["updated_at"] = rows[0].updated_at;
    const detectedLang = franc(detail);
    const lang = isoMap[detectedLang];
    await Promise.all(
      languages.map(async (language) => {
        const titleKey = `title${language}`;
        const detailKey = `detail${language}`;
        if (language === lang) {
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
        jobData[detailKey] = detailRes.translated;
        jobData[titleKey] = titleRes.translated;
      }),
    );
    const update = await Promise.all(
      languages.map(async (lng) => {
        const values = [
          fd[`${lng}JobType`],
          fd[`${lng}Category`],
          jobData[`detail${lng}`],
          jobData[`title${lng}`],
          rows[0][`${lng.toLowerCase()}jobid`],
        ];
        await db.query(
          "update jobtranslations set jobtype=$1,catagory=$2,detail=$3,title=$4 where id=$5",
          values,
        );
      }),
    );
    return NextResponse.json(
      { data: jobData, status: "successful" },
      { status: 200 },
    );
  }
  try {
    const detectedLang = franc(detail);
    const lang = isoMap[detectedLang];
    await Promise.all(
      languages.map(async (language) => {
        const titleKey = `title${language}`;
        const detailKey = `detail${language}`;
        if (language === lang) {
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
        jobData[detailKey] = detailRes.translated;
        jobData[titleKey] = titleRes.translated;
      }),
    );
    const insertIds: { [key: string]: number } = {};
    
    
        jobData.salary_range = fd.salary_range
    await Promise.all(
      languages.map(async (lng) => {
        const titleKey = `title${lng}`;
        const detailKey = `detail${lng}`;
        const locationKey = `${lng.toLowerCase()}Location`;
        const jobtypeKey = `${lng}JobType`;
        const catagoryKey = `${lng}Category`;
        jobData[`${lng}Location`] = decoded[locationKey]
        jobData[`${lng}Jobtype`] = fd[jobtypeKey]
        jobData[catagoryKey] = fd[catagoryKey]
        const values = [
          decoded[locationKey],
          fd[jobtypeKey],
          fd[catagoryKey],
          jobData[detailKey],
          jobData[titleKey],
        ]
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
      decoded.email,
      fd.salary_range,
    ];

    const { rows } = await db.query(
      `INSERT INTO jobs(enJobid, amJobid, posted_by,salary_range)
       VALUES($1,$2,$3,$4)
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
      { message: `failed to create job ${err}`, status: "unsuccessful" },
      { status: 500 },
    );
  }
}
