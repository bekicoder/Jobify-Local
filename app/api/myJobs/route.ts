import { NextRequest, NextResponse } from "next/server";
import { pool as db } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
export interface jobDataType {
    [key: string]: unknown;
    id: number;
    posted_by: string;
    created_at: string;
    titleEn: string;
    detailEn: string;
    titleAm: string;
    detailAm: string;
    titleAr: string;
    detailAr: string;
    titleFr: string;
    detailFr: string;
    EnCategory: string;
    FrCategory: string;
    ArCategory: string;
    AmCategory: string;
    EnJobtype: string;
    FrJobtype: string;
    ArJobtype: string;
    AmJobtype: string;
  }
  export const jobData: jobDataType = {
    id: 0,
    posted_by: "",
    created_at: "",
    flag:"",
    titleEn: "",
    detailEn: "",
    titleAm: "",
    detailAm: "",
    titleAr: "",
    detailAr: "",
    titleFr: "",
    detailFr: "",
    EnCategory: "",
    FrCategory: "",
    ArCategory: "",
    AmCategory: "",
    EnJobtype: "",
    FrJobtype: "",
    ArJobtype: "",
    AmJobtype: "",
  };
export async function GET(req: NextRequest) {
  const token = req.cookies.get("jobify-token")?.value;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const languages = ["en", "am", "ar", "fr"];
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (id) {
    const { rows:job } = await db.query("select * from jobs where id = $1;", [id]);
    jobData.created_at = job.created_at;
    jobData.posted_by = job.posted_by;
    jobData.flag = job.flag;
    await Promise.all(
      languages.map(async (lang) => {
        const lng = lang[0].toUpperCase()+lang[1]
        const titleKey = `title${lng}`;
        const detailKey = `detail${lng}`;
        const locationKey = `${lng}Location`;
        const jobtypeKey = `${lng}Jobtype`;
        const catagoryKey = `${lng}Category`;
       const { rows } =await db.query(
          `select * from jobTranslations where id = $1;`,
          [job[0][`${lang}jobid`]]
        )
        jobData[titleKey] = rows[0].title
          jobData[detailKey] = rows[0].detail
          jobData[locationKey] = rows[0].location
          jobData[catagoryKey] = rows[0].category
          jobData[jobtypeKey] = rows[0].jobtype
      })
    );

    return NextResponse.json({ data: jobData }, { status: 200 });
  }
  const data = jwt.verify(token, process.env.JWT_SECRET!);
  const decoded = data as JwtPayload;
  const resData = []
  const { rows:jobs } = await db.query("select * from jobs where posted_by = $1;", [
    decoded.email,
  ]);
  await Promise.all(
    jobs.map(async job=>{
      jobData.created_at = job.created_at;
    jobData.posted_by = job.posted_by;
    jobData.flag = job.flag;
    await Promise.all(
      languages.map(async (lang) => {
        const lng = lang[0].toUpperCase()+lang[1]
        const titleKey = `title${lng}`;
        const detailKey = `detail${lng}`;
        const locationKey = `${lng}Location`;
        const jobtypeKey = `${lng}Jobtype`;
        const catagoryKey = `${lng}Category`;
       const { rows } =await db.query(
          `select * from jobTranslations where id = $1;`,
          [job[`${lang}jobid`]]
        )
        jobData[titleKey] = rows[0].title
          jobData[detailKey] = rows[0].detail
          jobData[locationKey] = rows[0].location
          jobData[catagoryKey] = rows[0].category
          jobData[jobtypeKey] = rows[0].jobtype
      })
    )
    resData.push(jobData)
    })
  )
  
  return NextResponse.json({resData}, { status: 200 });
}


