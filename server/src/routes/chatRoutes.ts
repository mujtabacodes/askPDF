import express from 'express'
import { Socket } from 'socket.io'
import { startChat } from '../controllers/chatControllers'

const router = express.Router()

router.get('/', startChat)
export default router
