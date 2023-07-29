import { Router } from "express";
import authServices from "./auth.services";
import { ResponseHandler } from "../utility/response.handle";

const router=Router();

router.post("/register",async (req,res,next)=>{
    try{
     const details=req.body;
     const ans=await authServices.Register(details);
     res.send(new ResponseHandler(ans));
    }
    catch(error){
        next(error);
    }
})

router.post("/login",async(req,res,next)=>{
    try{
    const details=req.body;
    const ans=await authServices.Login(details);
    res.send(new ResponseHandler(ans));
    }
    catch(error){
        next(error);
    }
})

export default router