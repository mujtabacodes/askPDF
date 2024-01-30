"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExampleData = exports.getExample = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const Example_1 = __importDefault(require("../model/Example"));
const getExample = (req, res, next) => {
    res.json({ message: "hello" });
};
exports.getExample = getExample;
const getExampleData = async (req, res, next) => {
    const { name, id } = req.body;
    try {
        const example = await Example_1.default.findOne({ name });
        if (example)
            return next((0, http_errors_1.default)(406, "example already exists"));
        const newExample = new Example_1.default({ name, id });
        await newExample.save();
        res.json({ name, id });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.getExampleData = getExampleData;
