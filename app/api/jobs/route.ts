import { NextResponse, NextRequest } from "next/server";
import { pool as db } from "@/lib/db";
interface jobDataType {
  [key: string]: unknown;
  id: number;
  posted_by: string;
  created_at: string;
  titleEn: string;
  detailEn: string;
  titleAm: string;
  detailAm: string;
  EnCategory: string;
  AmCategory: string;
  EnJobtype: string;
  AmJobtype: string;
}
const jobData: jobDataType = {
  id: 0,
  posted_by: "",
  created_at: "",
  titleEn: "",
  detailEn: "",
  titleAm: "",
  detailAm: "",
  EnCategory: "",
  AmCategory: "",
  EnJobtype: "",
  AmJobtype: "",
};
const languages = ["en", "am"];
export async function GET() {
  const { rows } = await db.query("select * from jobs order by id desc;");
  return NextResponse.json({ count: rows.length});
}

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    const resData = [];
    const { rows: jobs } = await db.query("select * from jobs where id = $1;", [
      id,
    ]);
    console.log(jobs[0].id,"this is the id")
    await Promise.all(
      jobs.map(async (job) => {
        jobData.id = job.id
        jobData.created_at = job.created_at;
        jobData.posted_by = job.posted_by;
        jobData.salary_range = job.salary_range
        await Promise.all(
          languages.map(async (lang) => {
            const lng = lang[0].toUpperCase() + lang[1];
            const titleKey = `title${lng}`;
            const detailKey = `detail${lng}`;
            const locationKey = `${lng}Location`;
            const jobtypeKey = `${lng}Jobtype`;
            const catagoryKey = `${lng}Category`;
            const { rows } = await db.query(
              `select * from jobTranslations where id = $1;`,
              [job[`${lang}jobid`]],
            );
            jobData[titleKey] = rows[0].title;
            jobData[detailKey] = rows[0].detail;
            jobData[locationKey] = rows[0].location;
            jobData[catagoryKey] = rows[0].category;
            jobData[jobtypeKey] = rows[0].jobtype;
          }),
        );
      }),
    );
    return NextResponse.json({ jobData }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to fetch jobs ${err}` },
      { status: 500 },
    );
  }
}
