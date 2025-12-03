import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req,res){
    try{
        let reqBody=await req.json();
        reqBody.otp="0";

        const result = await prisma.users.create({
            data:reqBody
        });
        return NextResponse.json({status:"success",data:result});

    }
    catch (error){
        return NextResponse.json({staus:"fail",error:error.message});
    }

}
