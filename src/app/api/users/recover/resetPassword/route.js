import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
export async function POST(req,res){
    try{
        const reqBody = await req.json();
        const result=await prisma.users.count({where:{email:reqBody['email'],otp:reqBody['otp']}});
        if(result===1)
        {
           const result= await prisma.users.update({where:{email:reqBody['email']},data:{otp:"0",password:reqBody['password']}})
            return NextResponse.json({status:"success",message:"Password updated successfully."});
        }
        else {
            return NextResponse.json({staus:"fail",message:"Invalid OTP"});
        }
    }
    catch (e){
        return NextResponse.json({status:"fail",message:"Something went wrong"});

    }
}