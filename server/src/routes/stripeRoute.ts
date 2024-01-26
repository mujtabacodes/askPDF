import { Router } from 'express'
import { getExampleDataValidation } from '../validation/exampleValidation/exampleValidation'
import { postCustomer } from '../controllers/stripeController'

const router = Router()

router.post('/', postCustomer)
// router.post("/", getExampleDataValidation, getExampleData);

export default router
