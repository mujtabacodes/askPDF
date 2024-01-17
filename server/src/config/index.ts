import dotenv from 'dotenv'

dotenv.config()

export const DB = process.env.DB!
export const PORT = parseInt(process.env.PORT!)
export const FRONTEND_URL = process.env.FRONTEND_URL!
export const ChatGPT_API = process.env.CHATGPT_API!
