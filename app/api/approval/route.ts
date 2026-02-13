import { NextRequest,NextResponse } from "next/server";
import { pool as db } from "@/lib/db";
export async function  POST(req:NextRequest) {
    try{
    const {status,jobId} =await req.json()
    const values = [status ? 'approved' : "declined",jobId]
    const {rows} = await db.query("update proposals set approval = $1 where id=$2 RETURNING id",values)
    return NextResponse.json({msg:"successful"}, { status: 200 });
    }catch(err){
    console.log(err);
    return NextResponse.json({ msg: `approval faild ${err}` }, { status: 500 });
    }
}