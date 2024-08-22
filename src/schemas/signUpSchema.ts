import  {z} from "zod"

export const userValidation = z
   .string()
   .min(2,"Username must be at least 2 character")
   .max(10,"Username must not be more than 20 character")
   .regex(/^[a-zA-Z0-9_]+$/," Username must be not contain special case")



export const signUpSchema=z.object({
   username:userValidation,
   email:z.string().email({message: "Invalid email address"}),
   password: z.string().min(6,"message: password must be at least 6 character ").regex(/^[!@#$%^&*(),.?":{}|<>0-9]+$/, "message: password must be contain 2 special character")
}) 