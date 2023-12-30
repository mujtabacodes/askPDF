import { Router } from 'express'
import {
	addUser,
	checkUser,
	deleteAllUsers,
	deleteUser,
	getUsers,
} from '../controllers/userController'
import { getUserDataValidation } from '../validation/userValidation/userValidation'
const router = Router()

router.get('/', getUsers)
router.post('/', getUserDataValidation, addUser)
router.delete('/', deleteAllUsers)
router.delete('/:id', deleteUser)
router.get('/auth/', checkUser)

export default router
