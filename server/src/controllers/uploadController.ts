import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const userId = req.headers['user_id']

		const uploadPath = path.join(__dirname, '..', 'assets', 'uploads', `${userId}`)
		if (!fs.existsSync(uploadPath)) {
			console.log('uploadPath:', uploadPath)
			fs.mkdirSync(uploadPath, { recursive: true })
		}

		cb(null, uploadPath)
	},
	filename: function (req, file, cb) {
		const uniqueFileName = Date.now() + '-' + file.originalname
		cb(null, uniqueFileName)
	},
})

const upload = multer({ storage })

export const uploadSingleFile: RequestHandler = (req, res, next) => {
	try {
		upload.single('file')(req, res, err => {
			if (err) {
				console.error('Multer error:', err)
				return next(createHttpError(500, 'File upload failed'))
			}
			return res.status(200).json({ filename: req.file?.filename })
		})
	} catch (error) {
		console.error('Got an invalid error:', error)
		return next(createHttpError(500, 'Internal Server Error'))
	}
}

export const uploadMultiplefiles: RequestHandler = (req, res, next) => {
	try {
		upload.array('files')(req, res, err => {
			if (err) {
				console.error('Multer error:', err)
				return next(createHttpError(500, 'File upload failed'))
			}
			let files: string[] = []
			if (req.files && Array.isArray(req.files)) {
				// Asserting the type of req.files to be an array of Express.Multer.File
				;(req.files as Express.Multer.File[]).forEach(file => {
					files.push(file.filename)
				})
			}
			// console.log(files)
			return res.status(200).json({ files_list: files })
		})
	} catch (error) {
		console.error('Got an invalid error:', error)
		return next(createHttpError(500, 'Internal Server Error'))
	}
}
