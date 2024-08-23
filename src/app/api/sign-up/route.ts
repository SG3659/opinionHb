import  dbConnect from "../../../lib/dbConnect";
import  User from"../../../model/User";
import bcrypt from"bcryptjs";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";


export async function POST(request:Request){
try {
   await dbConnect();
   const {username, email, password} =await request.json()
   const  existingVerifiedUserByUsername=await User.findOne({
      username,
      isVerified:true
   })
   if(existingVerifiedUserByUsername){
      return Response.json({
         success:false,
         message: "Username Already exists"
      },{
         status:400
      })
   }
   const existingUserByEmail =await User.findOne({email})
   const verifyCode=Math.floor(10000+Math.random()*90000).toString();
   if(existingUserByEmail){
      if(existingUserByEmail.isVerified){
         return Response.json({
            success:false,
            message:"Username Already Exists with this email"
         },{
            status:400
         })
      }else{
         // save the updated user   
         const hashPassword= await bcrypt.hash(password,10)
         existingUserByEmail.password=hashPassword;
         existingUserByEmail.verifyCode=verifyCode;
         existingUserByEmail.verifyCodeExpiry= new Date(Date.now()+3600)
         await existingUserByEmail.save() 
      }
   }else{
      //new user 
      const hashPassword=await bcrypt.hash(password,10);
      const expiryDate=new Date();
      expiryDate.setHours(expiryDate.getHours()+1)
      const newUser =await User.create({
         username,
         email,
         password:hashPassword,
         verifyCode,
         verifyCodeExpiry:expiryDate,
         isVerified:false,
         isAcceptingMessage:true,
         messages:[],
      })
      await newUser.save();
   }
   // verification email send 
   const responseEmail= await sendVerificationEmail(
      email,
      username,
      verifyCode
   )
   if(responseEmail.success){
      return Response.json({
         success:true,
         message:"Verification otp send"
      },{
         status: 201
      })
   }
      return Response.json({
         success:false,
         message: responseEmail.message
      },{
         status:500
      })

} catch (error) {
   console.error("Error Registering User ",error);
   return Response.json({
      success:false,
      message:"Error In Registering"
   },{
      status:500
   })
}
} 


