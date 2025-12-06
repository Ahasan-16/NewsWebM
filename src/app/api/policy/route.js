import {NextResponse} from "next/server";
import prisma from '@/lib/prisma'
export async function GET(req,res){
    try{
        const {searchParams} = new URL(req.url);
        const type=searchParams.get("type");
        const result= await prisma.policies.findMany({where:{type:type}});
        return NextResponse.json({status:"Success",data:result});

    }
    catch(err){
        return NextResponse.json({status:"error", error:err});
    }
}