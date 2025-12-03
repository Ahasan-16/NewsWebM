import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {createToken} from "@/utility/JWTTokenHelper";
import {UnsecuredJWT as jwt} from "jose";

export async function POST(req,res){
    try{
        let reqBody=await req.json();
        const result = await prisma.users.findUnique({where:reqBody});
        if(result.length===0)
        {
            return NextResponse.json({status:"fail",data:result});
        }
        else {
            const token =await createToken(result['email'],result['id']);
            const expireDuration=new Date(Date.now()+24*60*60*1000).toUTCString();
            const cookieString=`token=${token};expires=${expireDuration}; path=/`;
            return NextResponse.json({status:"success",data:token},{status:200,headers:{'set-cookie':cookieString}});
        }
    }
    catch (error){
        return NextResponse.json({staus:"fail",error:error.message});
    }
}
