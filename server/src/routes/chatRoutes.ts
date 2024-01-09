import express from 'express'
import { startChat } from '../controllers/chatControllers'
const router = express.Router()

router.get('/', startChat)

export default router
