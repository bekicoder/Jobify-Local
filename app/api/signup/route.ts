import { NextResponse,NextRequest } from "next/server";
import { pool as db } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function POST(req:NextRequest){
    try{
      const { fname,lname,email, password, type:role ,location,flag} = await req.json();
      if(!fname || !lname || !email || !password || !role || !location || !flag){
    return NextResponse.json({error:"Invalid credentials"}, { status: 401 })
      }

      const {rows:doseExist} = await db.query("select 1 from users where email = $1",[email])
      if(doseExist.length > 0){
        return NextResponse.json({error:"user already exist"},{status:400});
      }

      const profileColors = [
  "#0388D2", "#00579B", "#0098A7", "#00897B", "#004D40",
  "#68A039", "#EF6C00", "#F6511E", "#C1175C", "#AA47BD",
  "#7B1FA2", "#512DA7", "#455A65",
  "#D32F2F", "#388E3C", "#303F9F", "#FBC02D", "#5D4037"
];
      const hashedPass = await bcrypt.hash(password,10)
      const name = fname + " " + lname
      const randomColor = profileColors[Math.floor(Math.random() * profileColors.length)]
      console.log(randomColor)
      const result =await db.query("INSERT INTO users (name, email, password, role,profile,location,flag) values($1,$2,$3,$4,$5,$6,$7) RETURNING *",[name,email,hashedPass,role,randomColor,location,flag])

      const user = result.rows[0]

      const token = jwt.sign(
        {id:user.id,name:user.name,email:user.email,role:user.role,profile:user.profile,location:user.location,flag:user.flag},
            process.env.JWT_SECRET!,{expiresIn:"7d"}
      )

      const response = NextResponse.json({message:"user created"})

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
        console.error(err);
        return NextResponse.json({ message: "Server error ",data:err }, { status: 500 });
    }
}