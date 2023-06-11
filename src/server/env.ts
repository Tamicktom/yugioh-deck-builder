//* Libraries imports
import z from "zod";
const envSchema = z.object({
  FIREBASE_APIKEY: z.string(),
  FIREBASE_AUTHDOMAIN: z.string(),
  FIREBASE_PROJECTID: z.string(),
  FIREBASE_STORAGEBUCKET: z.string(),
  FIREBASE_MESSAGINGSENDERID: z.string(),
  FIREBASE_APPID: z.string(),
  FIREBASE_MEASUREMENTID: z.string(),
});

export default envSchema.parse(process.env);