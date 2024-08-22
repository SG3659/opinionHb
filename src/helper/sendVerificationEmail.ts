import {resend} from "@/lib/resend"
import VerificationEmail from "../../email/verificationEmail"
import { ApiResponse } from "@/types/ApiREsponse"

export async  function sendVerificationEmail(
   email:string,
   username:string,
   verifyCode:string,
):Promise<ApiResponse>{
   try {
      await resend.emails.send({
         from: 'onboarding@resend.dev',
         to: email,
         subject: 'otp-Verification ',
         react: VerificationEmail({username,otp:verifyCode}),
       });
      return{success:false,message:"Successfully Send Email"}
   } catch (EmailError) {
      console.error("Something went wrong ",EmailError)
      return{success:false,message:" Failed to send verification email"}
   }
}