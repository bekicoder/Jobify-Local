import { NextResponse,NextRequest } from "next/server";
import jwt  from "jsonwebtoken";
 
export async function GET(req:NextRequest) {
  try{
    const token = req.cookies.get("jobify-token")?.value;
  if(!token){
    return NextResponse.json({message:"Unauthorized"},{status:401})
  }
    const decoded = jwt.verify(token,process.env.JWT_SECRET!)
      const {id,...data} = decoded;
      console.log(decoded)
    return NextResponse.json({...data});
  } catch(err){
    console.log(err)
    return NextResponse.json(
      { message: `Failed to fetch users ${err}` },
      { status: 500 }
    );
  }
}