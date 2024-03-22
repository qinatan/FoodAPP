import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import{v2 as cloudinary} from 'cloudinary';
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute"


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(
    ()=>console.log('connected to database'));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app= express(); //create a new express server
app.get("/health", async(req: Request, res: Response)=>{
    res.send({message: "health OK!"}); 
});

app.use(express.json()); //middlware - convert the body of any request to API server to json 
app.use(cors());
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute); 


const server = app.listen(8000, ()=>{
    console.log("server start on localhost:8000");
})


