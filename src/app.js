import express from "express";
import dotenv from "dotenv"
import { user_router } from "./routes/user.routes.js";
dotenv.config({});


const app = express();

app.use(express.json());

app.use('/user' , user_router)

app.get("/" , (req,res)=>{
    res.send("hellow");
})
export {app}