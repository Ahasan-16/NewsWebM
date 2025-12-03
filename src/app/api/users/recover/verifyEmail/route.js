import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {sendEmail} from "@/utility/EmailUtility";


export async function GET(req,res){
    try{
        const {searchParams} = new URL(req.url);
       let email= searchParams.get('email');
       const result=await prisma.users.count({where:{email:email}});
       if(result){
           const code=Math.floor(100000+Math.random()*900000);
           let EmailText=`Your otp code is ${code}`;
           let EmailSubject="New news verification code";
           await sendEmail(email,EmailText,EmailSubject);
           let result=await prisma.users.update({where:{email:email},data:{otp:code.toString()}});
           return NextResponse.json({status:"success",data:result});
       }
       else{
           return NextResponse.json({status:"Fail",message:"No user found."});
       }
    }
    catch (error) {
        return NextResponse.json({status:"fail",result:error})
    }
}