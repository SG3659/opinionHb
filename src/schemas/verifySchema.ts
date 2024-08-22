import {z} from "zod"

const verifySchema =z.object({
   code: z.string().length(6,"verification code must be 6 digit")
}) 
export default verifySchema