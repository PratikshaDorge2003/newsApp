import { Router } from "express";
import userServices from "./user.services";
import { ResponseHandler } from "../utility/response.handle";
import express from "express";
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';


let router = Router();

router.delete("/delete", async (req, res, next) => {
    try {
        const details = req.body.username;
        const ans = await userServices.removeuser(details);
        res.send(new ResponseHandler(ans));
    }
    catch (error) {
        next(error)
    }
});

router.post("/change", async (req,res,next)=>{
    try{
        const details=req.body;
        const ans=await userServices.change(details);
        res.send(new ResponseHandler(ans));

    }
    catch (error) {
        next(error)
    }

})

router.post("/check",async(req,res,next)=>{
    try{
    const details=req.body;
    const ans=await userServices.check(details);
    res.send(new ResponseHandler(ans));
    }
    catch(error){
        next(error)
    }
})

router.post("/email",async(req,res,next)=>{
    const details=req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pratikshadorge05@gmail.com',
          pass:"lfxwicsxrldtwfzn"
        }
})

const mailOptions = {
    from: 'pratikshadorge05@gmail.com',
    to: details.recipient,
    subject: details.subject,
    text: details.content
}

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});







export default router;