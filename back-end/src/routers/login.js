const express =require("express");
const {Users} = require("../models/user")
const bcrypt=require("bcrypt");
const {setSession,getSession}=require("../auth/sessionId")
// import { v4 as uuidv4 } from 'uuid';
const shortid=require("shortid")
const loginRoute=express.Router();



loginRoute.post('/',async(req,res)=>{

    const {email,password}=req.body;

    const user=await Users.findOne({email});

    if(!user)
    {
        res.status(404).json({status:false,messege:"user not found"});
    }

    const isPasswordCorrect =await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect)
    {
        res.status(404).json({status:false,messege:"wrong password"});
    }
    const sessionToken = shortid.generate();
    setSession(sessionToken,user);
    
    res.cookie('session_token', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge:  60 * 60 * 1000,
      });
    res.status(200).json({status:true,messege:"login successful",user:user})

})

module.exports={
    loginRoute
}