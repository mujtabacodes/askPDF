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
exports.deleteUser = exports.deleteAllUsers = exports.checkUser = exports.addUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../model/User"));
const http_errors_1 = __importDefault(require("http-errors"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Users = yield User_1.default.find({});
        res.json(Users);
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
});
exports.getUsers = getUsers;
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, email } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (user) {
            return next((0, http_errors_1.default)(406, 'This user already exists'));
        }
        const body = req.body;
        const newUser = new User_1.default({ name, password, email });
        yield newUser.save();
        res.status(200).json(`User ${name} registered successfully`);
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
});
exports.addUser = addUser;
const checkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.query;
    try {
        const user = yield User_1.default.findOne({ email }).select('+password'); // select is used to pick the fields we want in our query
        if (!user) {
            return next((0, http_errors_1.default)(404, 'User not found'));
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return next((0, http_errors_1.default)(401, 'Incorrect password'));
        }
        res.status(200).json({ user_id: user._id, name: user.name, email: user.email });
    }
    catch (error) {
        return next((0, http_errors_1.default)({ error }));
    }
});
exports.checkUser = checkUser;
const deleteAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.deleteMany({});
        res.status(200).json('All users deleted successfully');
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
});
exports.deleteAllUsers = deleteAllUsers;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.default.findByIdAndDelete(id);
        if (!user) {
            return next((0, http_errors_1.default)(404, 'User not found'));
        }
        res.status(200).json(`User deleted successfully`);
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, { error }));
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map