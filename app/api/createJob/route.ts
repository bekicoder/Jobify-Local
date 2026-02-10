import { NextResponse,NextRequest } from "next/server";
import {pool as db } from "@/lib/db"
import jwt, { JwtPayload } from "jsonwebtoken"

export async function POST(req:NextRequest) {
    const token = req.cookies.get("jobify-token")?.value
    const {data:fd,editId} =await req.json()
    if(!token){
    return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    const isValid = Object.values(fd).every(v => v !== null && v !== undefined && v !== "");
    if(!isValid){
    return NextResponse.json({error:"Invalid credentials"},
        {status:400}
    )
   }
  try{
    const data = jwt.verify(token,process.env.JWT_SECRET!);
    const decoded = data as JwtPayload
    if(decoded.role !=="employer"){
    return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    const values = [decoded.location,fd.jobType,decoded.flag,fd.catagory,fd.range,fd.detail,fd.title,decoded.email]
    if(editId){
      values.push(editId)
    }
    const sql = editId ? `update jobs set location = $1,jobtype = $2,flag = $3, created_at = now(),catagory=$4,salary_range=$5,detail=$6,title=$7,posted_by=$8 where id=$9 RETURNING id,location,jobtype,flag,catagory,salary_range,detail,title,posted_by,created_at;` : "insert into jobs(location,jobtype,flag,catagory,salary_range,detail,title,posted_by) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id,location,jobtype,flag,catagory,salary_range,detail,title,posted_by,created_at"
    const {rows} = await db.query(sql,values)
     return NextResponse.json({data:rows[0],status:"successful"},{status:200})
  }catch(err){
    console.log(err)
    return NextResponse.json({message:"failed to fetch user",status:"unsuccessful"},
    {status:500})
  }
}
