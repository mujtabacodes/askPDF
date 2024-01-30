"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDataValidation = void 0;
const validator_1 = __importDefault(require("../utils/validator"));
const userSchema_1 = require("./userSchema");
const getUserDataValidation = (req, res, next) => {
    (0, validator_1.default)(userSchema_1.userSchema.getUserData, req.body, next);
};
exports.getUserDataValidation = getUserDataValidation;
