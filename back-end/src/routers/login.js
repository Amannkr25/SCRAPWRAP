const express =require("express");
const {Users} = require("../models/user")
const {WasteType}= require("../models/wasteType")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv")
const {setSession,getSession,destroySession}=require("../auth/sessionId")
// import { v4 as uuidv4 } from 'uuid';
const shortid=require("shortid")
dotenv.config();

const loginRoute=express.Router();



loginRoute.post('/',async(req,res)=>{

    const {email,password,role}=req.body;
    const user=await Users.findOne({email});


    if(!user)
    {
        return res.status(404).json({status:false,messege:"user not found"});
    }

    if(user.role != role)
        return res.status(404).json({status:false,messege:"unathoraizesd user"});

    const isPasswordCorrect =await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect)
    {
        return res.status(404).json({status:false,messege:"wrong password"});
    }
    console.log(process.env.SECRET_key)
    // const sessionToken = shortid.generate();
    // setSession(sessionToken,user);
    const sessionToken = jwt.sign({...user}, process.env.SECRET_key, { expiresIn: '1h' });
    res.cookie('session_token', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge:  60 * 60 * 1000,
      });
      
    return res.status(200).json({status:true,messege:"login successful",user:user})
    

})
loginRoute.post('/logout', (req, res) => {
    const token = req.cookies.session_token;
    // destroySession(token); // Your function to remove it
    res.clearCookie('session_token');
    res.status(200).json({ status: true, message: "Logged out" });
});

module.exports={
    loginRoute
}