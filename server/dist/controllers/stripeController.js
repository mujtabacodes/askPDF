"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPaymentStatus = exports.postCustomer = void 0;
const uuid_1 = require("uuid");
const config_1 = require("../config");
const User_1 = __importDefault(require("../model/User"));
const http_errors_1 = __importDefault(require("http-errors"));
const stripe = require('stripe')(config_1.STRIPE_SECRET_KEY);
// import Stripe from 'stripe'
// const stripe = new Stripe(STRIPE_SECRET_KEY)
const postCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product, token } = JSON.parse(req.body.data);
        console.log('PRODUCT', product);
        console.log('PRICE', product.price);
        const idempotencyKey = (0, uuid_1.v4)();
        console.log('idempotencyKey', idempotencyKey);
        const customer = yield stripe.customers.create({
            email: token.email,
            source: token.id,
        });
        // Update user details
        const user = yield User_1.default.findOneAndUpdate({ email: token.email }, {
            $set: {
                stripeCustomerId: customer.id,
                paymentStatus: 'paid',
            },
        }, { new: true });
        if (!user) {
            // If user not found, handle accordingly
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        const charge = yield stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country,
                },
            },
        }, { idempotencyKey });
        console.log('charge', charge);
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
exports.postCustomer = postCustomer;
const checkPaymentStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { user_id } = req.query;
    try {
        const user = yield User_1.default.findById(user_id);
        if (!user) {
            return next((0, http_errors_1.default)(404, 'User not found'));
        }
        console.log('User found successfully');
        console.log(user.paymentStatus);
        res.status(200).json({ paymentStatus: user.paymentStatus });
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, { error }));
    }
});
exports.checkPaymentStatus = checkPaymentStatus;
//# sourceMappingURL=stripeController.js.map