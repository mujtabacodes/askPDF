"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultiplefiles = exports.uploadSingleFile = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.headers['user_id'];
        const uploadPath = path_1.default.join(__dirname, '..', 'assets', 'uploads', `${userId}`);
        // if (!fs.existsSync(uploadPath)) {
        console.log('uploadPath:', uploadPath);
        fs_1.default.mkdirSync(uploadPath, { recursive: true });
        // }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueFileName = Date.now() + '-' + file.originalname;
        cb(null, uniqueFileName);
    },
});
const upload = (0, multer_1.default)({ storage });
const uploadSingleFile = (req, res, next) => {
    try {
        upload.single('file')(req, res, err => {
            if (err) {
                console.error('Multer error:', err);
                return next((0, http_errors_1.default)(500, 'File upload failed'));
            }
            return res.status(200).json({ filename: req.file?.filename });
        });
    }
    catch (error) {
        console.error('Got an invalid error:', error);
        return next((0, http_errors_1.default)(500, 'Internal Server Error'));
    }
};
exports.uploadSingleFile = uploadSingleFile;
const uploadMultiplefiles = (req, res, next) => {
    try {
        upload.array('files')(req, res, err => {
            if (err) {
                console.error('Multer error:', err);
                return next((0, http_errors_1.default)(500, 'File upload failed'));
            }
            let files = [];
            if (req.files && Array.isArray(req.files)) {
                // Asserting the type of req.files to be an array of Express.Multer.File
                ;
                req.files.forEach(file => {
                    files.push(file.filename);
                });
            }
            // console.log(files)
            return res.status(200).json({ files_list: files });
        });
    }
    catch (error) {
        console.error('Got an invalid error:', error);
        return next((0, http_errors_1.default)(500, 'Internal Server Error'));
    }
};
exports.uploadMultiplefiles = uploadMultiplefiles;
//# sourceMappingURL=uploadController.js.map