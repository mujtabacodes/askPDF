"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// chatRoutes.ts
const express_1 = __importDefault(require("express"));
const chatControllers_1 = require("../controllers/chatControllers");
const router = express_1.default.Router();
const chatRoute = (io) => {
    io.on('connection', (0, chatControllers_1.startChat)(io));
    return router;
};
exports.default = chatRoute;
//# sourceMappingURL=chatRoutes.js.map