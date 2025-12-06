import {NextResponse} from "next/server";
import {headers} from "next/headers";
import prisma from "@/lib/prisma";
export async function GET(req,res){
    try{
        let headerList=await headers();
        let id=parseInt(headerList.get('id'));
        const result=await prisma.users.findUnique({where:{id:id}});
        return NextResponse.json({status:"success",data:result});
    }
    catch(err){
        return NextResponse.json({status:"fail",message:"Something went wrong"});
    }
}