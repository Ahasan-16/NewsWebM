import {NextResponse} from "next/server";
import {headers} from "next/headers";
import prisma from "@/lib/prisma"
export async function GET(req,res){
    try{
        const headerList=await headers();
        const id=parseInt(headerList.get('id'));
        const result =await prisma.comments.findMany({
            where:{userId:id}
        });
        return NextResponse.json({status:"success",data:result});

    }
    catch(e){
        return NextResponse.json({status:"fail",data:e})
    }
}
export async function POST(req,res){
    try{
        const headerList=await headers();
        const id=parseInt(headerList.get('id'));
        const reqBody=await req.json();
        reqBody.userId=id;
        const result=await prisma.comments.create({
            data:reqBody
        });

    }
    catch(e){
        return NextResponse.json({status:"fail",data:e})
    }
}
export async function DELETE(req,res){
    try{
        const headerList=await headers();
        const userId=parseInt(headerList.get('id'));
        const reqBody=await req.json();
        const commentId=parseInt(reqBody['id']);
        const result=await prisma.comments.deleteMany({
            where:{
                AND:[
                    {userId:userId},
                    {id:commentId}
                ]
            }
        })
        return NextResponse.json({status:"success",data:result});

    }
    catch(e){
        return NextResponse.json({status:"fail",data:e})
    }
}