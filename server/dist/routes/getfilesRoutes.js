"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getfilesController_1 = require("../controllers/getfilesController");
const router = express_1.default.Router();
router.get('/files', getfilesController_1.getAllFiles);
exports.default = router;
//# sourceMappingURL=getfilesRoutes.js.map