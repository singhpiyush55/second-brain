
import express from "express";
import { Router } from "express";
import userRoute from "./routes/user.route.js"
import contentRoute from "./routes/content.route.js";
import brainRoute from "./routes/brain.route.js";
import {connect} from "./config/config.js"
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("I am Healthy.")
})
app.use('/api/v1/user', userRoute);
app.use('/api/v1/content', contentRoute);
app.use('/api/v1/brain', brainRoute);




connect();
app.listen(3000);