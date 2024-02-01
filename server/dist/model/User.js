"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_errors_1 = __importDefault(require("http-errors"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    stripeCustomerId: { type: String, default: null },
    paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
});
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const match = await bcrypt_1.default.compare(candidatePassword, this.password);
        return match;
    }
    catch (error) {
        throw error;
    }
};
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, { error }));
    }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map