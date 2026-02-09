import { NextRequest,NextResponse } from "next/server";
import { pool as db } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function POST(req:NextRequest){
    try{
    const {email,password,type} =await req.json()
    const hashePass = await bcrypt.hash(password,10)
    const tableName = type == "employer" ? "organizations" : type == "employee" && "users";
    const {rows} =await db.query(`select * from ${tableName} where email = $1;`,[email])
    const column_name = type == "employee" ? "name" : type == "employer" && "orgname"
    const user = rows[0]
        if(rows.length == 0 ){
        return NextResponse.json({message:`don't exist`},{status:500})
    }
    
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    
    const response = NextResponse.json(
      {message:"successful"},
      {status:200}
      );
  
  
 const token = jwt.sign(
         {id:user.id,name:user[column_name],email:user.email,profile:user.profile,location:user.location,flag:user.flag},
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