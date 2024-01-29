"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.deleteAllUsers = exports.checkUser = exports.addUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../model/User"));
const http_errors_1 = __importDefault(require("http-errors"));
const getUsers = async (req, res, next) => {
    try {
        const Users = await User_1.default.find({});
        res.json(Users);
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.getUsers = getUsers;
const addUser = async (req, res, next) => {
    const { name, password, email } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (user) {
            return next((0, http_errors_1.default)(406, 'This user already exists'));
        }
        const body = req.body;
        const newUser = new User_1.default({ name, password, email });
        await newUser.save();
        res.status(200).json(`User ${name} registered successfully`);
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.addUser = addUser;
const checkUser = async (req, res, next) => {
    let { email, password } = req.query;
    try {
        const user = await User_1.default.findOne({ email }).select('+password'); // select is used to pick the fields we want in our query
        if (!user) {
            return next((0, http_errors_1.default)(404, 'User not found'));
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next((0, http_errors_1.default)(401, 'Incorrect password'));
        }
        res.status(200).json({ user_id: user._id, name: user.name, email: user.email });
    }
    catch (error) {
        return next((0, http_errors_1.default)({ error }));
    }
};
exports.checkUser = checkUser;
const deleteAllUsers = async (req, res, next) => {
    try {
        await User_1.default.deleteMany({});
        res.status(200).json('All users deleted successfully');
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.deleteAllUsers = deleteAllUsers;
const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User_1.default.findByIdAndDelete(id);
        if (!user) {
            return next((0, http_errors_1.default)(404, 'User not found'));
        }
        res.status(200).json(`User deleted successfully`);
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, { error }));
    }
};
exports.deleteUser = deleteUser;
