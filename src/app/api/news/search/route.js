import {NextResponse} from "next/server";
import prisma from "@/lib/prisma"
export async function GET(req,res){
    try{
        const {searchParams}= new URL(req.url);
        const keywords=searchParams.get("keywords");
        const result=await prisma.news_list.findMany({where:{title:{contains:keywords}},select:{id:true,title:true,short_des:true,img1:true,img2:true,img3:true,img4:true}});
        return NextResponse.json({status:"Success",result:result});
    }
    catch(e){
        return NextResponse.json({status:"Error",data:e});
    }
}