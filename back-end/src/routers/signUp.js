const express =require("express");

const route=express.Router();
const {Users}=require("../models/user")

route.post('/',async(req,res)=>{

    const {name,email,phone,password}=req.body;
    console.log(name,email,phone,password);
    try
    {
        const user=new Users({name,email,phone,password});
        await user.save();

        res.status(201).json({status:true,user:user,messege:"created successfully"});
    }
    catch(error)
    {
        res.status(400).json({status:false,error:error,messege:"not created successfully"})
    }


})

module.exports={
    route
}