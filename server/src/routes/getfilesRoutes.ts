import express from 'express'
import { getAllFiles } from '../controllers/getfilesController'
const router = express.Router()

router.get('/files', getAllFiles)

export default router
