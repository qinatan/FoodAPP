import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'; 
const userSchema= new mongoose.Schema({
    auth0Id:{
        type: String, 
        required: true, 
    },
    email:{
        type: String, 
        required: true, 
    },
    name:{
        type: String, 
    },
    addressLine1: {
        type: String, 
    },
    city:{
        type: String, 
    }, 
    country: {
        type: String, 
    },
})


//cretae a Mongoose model named "User" based on the defined schema. 
//The model provides an interface to interact with the MongoDB collection named users (MongoDB automatically pluralizes the model name)
const User = mongoose.model("User", userSchema); 
export default User; 