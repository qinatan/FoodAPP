import {Request, Response} from "express"; 
import User from "../models/user";


const createCurrentUser = async(req: Request, res: Response)=>{
    //1. check if the user exits
    //2. create the user if it does not exist
    //3. return the user object to the calling client(front end)
    try{
        const {auth0Id} = req.body;        
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
        console.error("Error creating user:", error);
        res.status(500).json({message: "Error found when creating user"}); 
    }
}; 


const updateCurrentUser = async(req: Request, res: Response)=>{
    try{
        //form data when user submit a form -> comes from the request body
       const{name, addressLine1, country, city}= req.body; 
       const user = await User.findById(req.userId); 
       if(!user){
        return res.status(404).json({message: "user not found"}); 
       }
       user.name = name;
       user.addressLine1 = addressLine1;
       user.city = city; 
       user.country = country; 
       await user.save(); 
       res.send(user); 
    } catch(error){
        console.error("Error updating user:", error); 
        res.status(500).json({message: "Error updating user"});
    }
}

const getCurrentUser = async(req: Request, res: Response)=>{
    try{
        const currentUser = await User.findOne({_id: req.userId})
        console.log(currentUser)
        if(!currentUser){
            return res.status(404).json({message: "User not found"}); 
        }    
        return res.json(currentUser); 
    
    }catch(error){
        console.error(error); 
        return res.status(500).json({message: "Error getting user"})
    }
}






export default{
    createCurrentUser,
    updateCurrentUser, 
    getCurrentUser, 
};

