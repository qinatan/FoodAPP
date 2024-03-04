import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import MyUserRoute from "./routes/MyUserRoute";

console.log('MONGODB_CONNECTION_STRING:', process.env.MONGODB_CONNECTION_STRING);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(
    ()=>console.log('connected to database'));

const app= express(); //create a new express server

app.use(express.json()); //middlware - convert the body of any request to API server to json 
app.use(cors());
app.use("/api/my/user", MyUserRoute)


app.get('/test', async(req: Request, res: Response)=>{
    res.json({message: "Hello!"}); 
});
const server = app.listen(8000, ()=>{
    console.log("server start on localhost:8000");
})


