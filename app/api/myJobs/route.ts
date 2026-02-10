import { NextRequest, NextResponse } from "next/server";
import { pool as db } from "@/lib/db";
import jwt,{ JwtPayload } from "jsonwebtoken";
export async function GET(req: NextRequest) {
  const token = req.cookies.get("jobify-token")?.value;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (id) {
    const { rows } = await db.query("select * from jobs where id = $1;", [id]);
    return NextResponse.json({ data: rows[0] }, { status: 200 });
  }
    const data = jwt.verify(token,process.env.JWT_SECRET!);
    const decoded = data as JwtPayload;
    const { rows } = await db.query("select * from jobs where posted_by = $1;", [
    decoded.email,
  ]);
  return NextResponse.json({ data: rows }, { status: 200 });
}
