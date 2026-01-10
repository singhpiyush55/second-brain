import { Router } from "express";
const router = Router();

router.post('/signup', (req, res)=>{
    res.send("I am working you are good to go.")
})

export default router;