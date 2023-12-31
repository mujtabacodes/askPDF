import { Router } from 'express'
import { uploadMultiplefiles, uploadSingleFile } from '../controllers/uploadController'
const router = Router()

router.post('/singlefile', uploadSingleFile)
router.post('/multiplefiles', uploadMultiplefiles)

export default router
