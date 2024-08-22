import {z} from "zod"

const messageSchema =z.object({
   content: z
   .string()
   .min(10, {message:"content must be at least 10 character"})
   .max(300,{message:"content must be not be greater than 300 character "}),
}) 
export default messageSchema