import { NextRequest,NextResponse } from "next/server";
import { pool as db } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function POST(req:NextRequest){
    try{
    const fd =await req.formData()
    const email = fd.get("email")
    const password = fd.get("password")
    const hashePass = await bcrypt.hash(password,10)
    const {rows} =await db.query("select * from users where email = $1;",[email])
    const user = rows[0]
        if(rows.length = 0){
        return NextResponse.json({message:"user don't exist"},{status:401})
    }
    
    const isMatch =await bcrypt.compare(password,user.password)

    if(!isMatch){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    
    const response = NextResponse.redirect(
    new URL("/", req.nextUrl.origin)
  );
  
  
 const token = jwt.sign(
         {id:user.id,name:user.name,email:user.email,role:user.role,profile:user.profile,location:user.location,flag:user.flag},
             process.env.JWT_SECRET!,{expiresIn:"7d"}
       )

 response.cookies.set({
        name:"jobify-token",
        value:token,
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        path:"/",
        maxAge:60 * 60 * 24 * 7,
      })
      return response;
    }catch(err){
        console.log(err)
        return NextResponse.json({message:`server error ${err}`},{status:500})
    }
}