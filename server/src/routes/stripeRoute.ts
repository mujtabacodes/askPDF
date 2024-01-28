import { Router } from 'express'
import { getExampleDataValidation } from '../validation/exampleValidation/exampleValidation'
import { checkPaymentStatus, postCustomer } from '../controllers/stripeController'

const router = Router()

router.post('/', postCustomer)
router.get('/status', checkPaymentStatus)
// router.post("/", getExampleDataValidation, getExampleData);

export default router
