import {Request, Response} from "express"; 
import User from "../models/user";

const createCurrentUser = async(req: Request, res:Response)=>{
    //1. check if the user exits
    //2. create the user if it does not exist
    //3. return the user object to the calling client(front end)
    try{
        const{auth0Id} = req.body; 

        //User is the mongoDB model
        const existingUser = await User.findOne({auth0Id})
        if (existingUser){
            return res.status(200).send(); 
        }
        
        //User is a MongoDB model
        //newUser is a instance of User model
        const newUser = new User(req.body);
        await newUser.save(); 
        res.status(201).json(newUser.toObject()); 

    } catch(error){
        console.log(error); 
        res.status(500).json({message: "Error creating user"}); 
    }
}; 

export default{
    createCurrentUser,
};