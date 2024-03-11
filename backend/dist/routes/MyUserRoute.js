"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MyUserController_1 = __importDefault(require("../controllers/MyUserController"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
//jwtCheck not working
// /api/my/user
router.post("/", MyUserController_1.default.createCurrentUser);
router.get("/", auth_1.jwtParse, MyUserController_1.default.getCurrentUser);
router.put("/", auth_1.jwtParse, validation_1.validateMyUserRequest, MyUserController_1.default.updateCurrentUser);
exports.default = router;
