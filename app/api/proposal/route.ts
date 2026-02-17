import { NextRequest, NextResponse } from "next/server";
import { pool as db } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { splitText, translateLargeText } from "../createJob/route";
import { franc } from "franc";
import {cities as citiesEn} from "@/lib/languages/en.json"
import {cities as citiesAm} from "@/lib/languages/am.json"
import { jobData } from "../myJobs/route";
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("jobify-token")?.value;
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const id = searchParams.get("id");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (id) {
      const { rows } = await db.query(
        "select * from proposals where id = $1;",
        [id],
      );
      return NextResponse.json({ data: rows[0] }, { status: 200 });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET!);
    const decoded = data as JwtPayload;
    const sql = `select * from proposals where ${role == "employer" ? "career_owner" : "sender"} = $1 order by id desc;`;
    const { rows } = await db.query(sql, [decoded.email]);
    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: `Failed  ${err}` }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("jobify-token")?.value;
    const proposal = await req.json();
    const article = proposal.article;
    if (!proposal) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }
    if (!token) {
      return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET!);
    const decoded = data as JwtPayload;
    const languages = ["En", "Am"]
    const isoMap: Record<string, string> = {
      eng: "En",
      amh: "Am",
    };
    const proposalData: Record<string, string> = {};
    const detectedLang = franc(article);
    const lang = isoMap[detectedLang] || "En";
    
    const locationId = citiesEn.filter((c) => c.name == decoded['enLocation']);
    const locationMap: Record<string, { id: number; name: string }[]> = {
      En: citiesEn,
      Am: citiesAm,
    };
    languages.map((lng) => {
      const countrie = locationMap[lng].filter((c) => {
        return c.id == Number(locationId[0].id);
      });
      proposalData[`senderloc${lng.toLowerCase()}`] = countrie[0].name;
    });

    const values = Object.values(proposalData);
    values.unshift(
      decoded.name,
      decoded.email,
      proposal.id,
      proposal.posted_by,
    );
    await Promise.all(
      languages.map(async (language) => {
        const proposalKey = `${language.toLowerCase()}proposal`;
        if (language === lang) {
          proposalData[proposalKey] = article;
          values.push(article);
          return;
        }
        const [proposalRes] = await Promise.all([
          translateLargeText(
            article,
            lang.toLowerCase(),
            language.toLowerCase(),
          ),
        ]);
        proposalData[proposalKey] = proposalRes.translated;
        values.push(proposalRes.translated);
      }),
    );
    const { rows } = await db.query(
      `insert into proposals (name,sender,career_id,career_owner,senderlocEn,senderlocam,enproposal,amproposal) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id;`,
      values,
    );
    return NextResponse.json(
      { msg: "successful", id: rows[0].id },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: `Failed  ${err}` }, { status: 500 });
  }
}
