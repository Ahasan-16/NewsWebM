import {NextResponse} from "next/server";
import prisma from "@/lib/prisma"
export async function GET(req,res){
    try{
        const {searchParams}= new URL(req.url);
        const id=parseInt(searchParams.get("id"));
        const result=await prisma.news_list.findUnique({where:{id:id},include:{categories:true}});
        return NextResponse.json({status:"Success",result:result});
    }
    catch(e){
        return NextResponse.json({status:"Error",data:e});
    }
}