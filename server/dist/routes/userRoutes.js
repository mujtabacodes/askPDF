"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userValidation_1 = require("../validation/userValidation/userValidation");
const router = (0, express_1.Router)();
router.get('/', userController_1.getUsers);
router.post('/', userValidation_1.getUserDataValidation, userController_1.addUser);
router.delete('/', userController_1.deleteAllUsers);
router.delete('/:id', userController_1.deleteUser);
router.get('/auth/', userController_1.checkUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map