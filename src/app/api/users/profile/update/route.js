import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {headers} from "next/headers";
export async function POST(req,res){
    try{
        const reqBody=await req.json();
        const headerList= await headers();
        const id=parseInt(headerList.get("id"));
        const result=await prisma.users.update({where:{id:id},data:reqBody});
        return NextResponse.json({status:"success",data:result});
    }
    catch(err){
        return NextResponse.json({status:"error",data:err});
    }
}