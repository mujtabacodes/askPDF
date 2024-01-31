"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripeController_1 = require("../controllers/stripeController");
const router = (0, express_1.Router)();
router.post('/', stripeController_1.postCustomer);
router.get('/status', stripeController_1.checkPaymentStatus);
// router.post("/", getExampleDataValidation, getExampleData);
exports.default = router;
//# sourceMappingURL=stripeRoute.js.map