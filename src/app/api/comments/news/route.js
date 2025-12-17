import {NextResponse} from "next/server";
import prisma from "@/lib/prisma"
export async function GET(req,res){
    try{
        const {searchParams} = new URL(req.url);
        const newsId=parseInt(searchParams.get("newsId"));
        const result=await prisma.comments.findMany({
            where:{newsId:newsId},
            include:{
                users: {select:{firstName:true,lastName:true}},
            }
        });
        return NextResponse.json({status:"success",data:result});

    }
    catch(err){
        return NextResponse.json({status:"fail",result:err});
    }
}