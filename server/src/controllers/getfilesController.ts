import { RequestHandler } from 'express'
import path from 'path'
import fs from 'fs'

export const getAllFiles: RequestHandler = (req, res, next) => {
	// console.log()
	try {
		const userId = req.query.userId

		const userFolderPath = path.join(__dirname, '..', 'assets', 'uploads', `${userId}`)
		// console.log(userFolderPath)
		// Check if the user directory exists
		if (!fs.existsSync(userFolderPath)) {
			return res.status(404).json({ message: 'User directory not found' })
		}

		// Get a list of files in the user directory
		const files = fs.readdirSync(userFolderPath)
		// console.log(userFolderPath)
		// Return the list of files as a response
		return res.status(200).json({ files })
	} catch (error) {
		// console.error('Got an error while retrieving files:', error)
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}
