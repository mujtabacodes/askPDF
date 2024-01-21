import dotenv from 'dotenv'

dotenv.config()

export const DB = process.env.DB!
export const PORT = parseInt(process.env.PORT!)
export const FRONTEND_URL = process.env.FRONTEND_URL!
export const OPENAI_KEY = process.env.OPENAI_KEY!
export const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY!
export const SUPABASE_URL = process.env.SUPABASE_URL!
