"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFiles = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getAllFiles = (req, res, next) => {
    // console.log()
    try {
        const userId = req.query.userId;
        const userFolderPath = path_1.default.join(__dirname, '..', 'assets', 'uploads', `${userId}`);
        // console.log(userFolderPath)
        // Check if the user directory exists
        if (!fs_1.default.existsSync(userFolderPath)) {
            return res.status(404).json({ message: 'User directory not found' });
        }
        // Get a list of files in the user directory
        const files = fs_1.default.readdirSync(userFolderPath);
        // console.log(userFolderPath)
        // Return the list of files as a response
        return res.status(200).json({ files });
    }
    catch (error) {
        // console.error('Got an error while retrieving files:', error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getAllFiles = getAllFiles;
