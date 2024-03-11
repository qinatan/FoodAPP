import express from "express"; 
import { MongoCryptAzureKMSRequestError } from "mongodb";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router(); 

//jwtCheck not working

// /api/my/user
router.post("/", MyUserController.createCurrentUser);
router.get ("/", jwtParse, MyUserController.getCurrentUser); 
router.put("/", jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser); 
export default router; 
