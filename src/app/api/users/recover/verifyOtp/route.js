import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req,res){
    try{
        const reqBody=await req.json();
        const result=await prisma.users.count({where:reqBody});
        if(result===1)
        {
            return NextResponse.json({status:"success",data:"Valid OTP code"});
        }
        else {
            return NextResponse.json({status:"fail",data:"Invalid OTP code"});
        }

    }
    catch(e){
        return NextResponse.json({status:"fail",result:e.message});
    }

}