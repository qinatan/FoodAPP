import express from "express"; 
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router(); 
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 *1024 *1024 
    }
}) 

// /api/my/restaurant
router.post("/", upload.single("imageFile"), validateMyRestaurantRequest, jwtParse, MyRestaurantController.createMyRestaurant);
router.get("/", jwtParse, MyRestaurantController.getMyRestaurant); 
router.put("/", upload.single("imageFile"), validateMyRestaurantRequest, jwtParse, MyRestaurantController.updateMyRestaurant);
export default router;