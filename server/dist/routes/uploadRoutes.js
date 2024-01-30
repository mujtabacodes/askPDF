"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadController_1 = require("../controllers/uploadController");
const router = (0, express_1.Router)();
router.post('/singlefile', uploadController_1.uploadSingleFile);
router.post('/multiplefiles', uploadController_1.uploadMultiplefiles);
exports.default = router;
//# sourceMappingURL=uploadRoutes.js.map