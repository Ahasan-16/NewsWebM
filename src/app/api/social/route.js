import {NextResponse} from "next/server";
import prisma from '@/lib/prisma'
export async function GET(req,res){
    try{

        const result= await prisma.socials.findMany();
        return NextResponse.json({status:"success",data:result});

    }
    catch(err){
        return NextResponse.json({status:"error", error:err});
    }
}