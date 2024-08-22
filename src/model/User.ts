import mongoose,{ Schema,Document } from "mongoose";

export interface Message extends Document {
   content:string,
   createdAt:Date,
}
export interface User extends Document {
   username:string,
   email:string,
   password:string,
   verifyCode:string,
   verifyCodeExpiry:Date,
   isVerified:boolean,
   isAcceptingMessage:boolean,
   messages:Message[],
}

const MessageSchema: Schema<Message> =new Schema({
   content:{
      type:String,
      require:true
   },
   createdAt:{
      type:Date,
      require:true,
      default:Date.now()
   }
})

const UserSchema: Schema<User>=new Schema({
   username:{
      type:String,
      require:[true,"username is required"],
      unique: true, 
      trim:true,
   },
   email:{
      type:String,
      require:[true,"email is required"],
      unique: true,
      match:[/.+\@.+\..+/,"please use a valid email address"]                     
   },
   password:{
      type:String,
      require:[true,"password is required"],
      unique: true,                     
   },
   verifyCode:{
      type:String,
      require:[true,"verifyCode is required"],                   
   },
   verifyCodeExpiry:{
      type:Date,
      require:[true,"verifyCode Expiry is required"],                   
   },
   isVerified:{
      type:Boolean,
      default:false,                   
   },
   isAcceptingMessage:{
      type:Boolean,
      default:true,                   
   },
   messages:[MessageSchema],
   
})
const userModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)
export default userModel;
