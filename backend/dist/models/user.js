"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    _id: mongodb_1.ObjectId,
    auth0Id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    addressLine1: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
});
//cretae a Mongoose model named "User" based on the defined schema. 
//The model provides an interface to interact with the MongoDB collection named users (MongoDB automatically pluralizes the model name)
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
