import express from "express"; 
import { MongoCryptAzureKMSRequestError } from "mongodb";
import MyUserController from "../controllers/MyUserController";

const router = express.Router(); 

// /api/my/user
router.post("/", MyUserController.createCurrentUser); 

export default router; 
