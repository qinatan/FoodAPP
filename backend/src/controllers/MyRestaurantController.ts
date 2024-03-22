import{Request, Response} from "express"; 
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const updateMyRestaurant = async(req: Request, res: Response) =>{
    try{
        const restaurant = await Restaurant.findOne({user: req.userId});
        if(!restaurant){
            return res.status(404).json({message: "restaurant not found"})
        }
        const {restaurantName, city, country, deliveryPrice, estimatedDeliveryTime, cuisines, menuItems } = req.body
        restaurant.restaurantName = restaurantName; 
        restaurant.city = city;
        restaurant.country = country; 
        restaurant.deliveryPrice = deliveryPrice; 
        restaurant.estimatedDeliveryTime = estimatedDeliveryTime;  
        restaurant.cuisines = cuisines; 
        restaurant.menuItems = menuItems; 
        restaurant.lastUpdate = new Date();
        if(req.file){
            restaurant.imageUrl = await uploadImage(req.file as Express.Multer.File)
        }
        await restaurant.save();
        res.status(200).send(restaurant)
    
    } catch(error){
        res.status(500).json({message: "Something went wrong"})
    }
    
}
const getMyRestaurant = async(req: Request, res: Response) =>{
    try{
        const restaurant = await Restaurant.findOne({user: req.userId})
        if (!restaurant){
            return res.status(404).json({message: "restaurant not found"}); 
        }
        res.json(restaurant); 
    } catch(error){
        res.status(500).json({message: "something went wrong"})
    }
}

const createMyRestaurant = async(req: Request, res: Response)=>{
    try{
        const existingRestaurant = await Restaurant.findOne( {user: req.userId}); 
        if (existingRestaurant){
            return res.status(409).json({message: "User restaurant already exists"});
        }
        const restaurant = new Restaurant(req.body); 
        const imageUrl =  uploadImage(req.file as Express.Multer.File);
        restaurant.imageUrl = await imageUrl; //URL of the uploaded media file on Cloudinary 
        restaurant.user = new mongoose.Types.ObjectId(req.userId); 
        restaurant.lastUpdate = new Date(); 
        restaurant.save(); 
        console.log(restaurant)
        res.status(201).send(restaurant);
    }catch(error){
        res.status(500).json({message: "something went wrong"})
    }
};

const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
  };

export default{
    createMyRestaurant,
    getMyRestaurant, 
    updateMyRestaurant,
}