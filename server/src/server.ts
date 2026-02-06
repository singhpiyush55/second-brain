
import express from "express";
import { Router } from "express";
import userRoute from "./routes/user.route.js"
import {connect} from "./config/config.js"
import dotenv from "dotenv";
dotenv.config();
const app = express();
const router = Router();

app.use(express.json());
app.use('/api/v1/user', userRoute);
app.get('/', (req, res)=>{
    res.send("I am Healthy.")
})

connect();
app.listen(3000);