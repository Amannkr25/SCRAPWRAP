const express =require("express");

const route=express.Router();
const {Users}=require("../models/user")

route.post('/',async(req,res)=>{

    const {name,email,phone,password}=req.body;
    console.log(name,email,phone,password);

    try{

        const bool=await Users.findOne({ $or: [{ email: email }, { phone: phone }] })
        if(bool)
           return res.status(409).json({status:false,messege:"user already exited"})
    }catch(err)
    {
        return res.status(500).json({status:false,messege :"error in finding user"});
    }

    try
    {
        const user=new Users({name,email,phone,password});
        await user.save();

       return res.status(201).json({status:true,user:user,messege:"created successfully"});
    }
    catch(error)
    {
       return res.status(400).json({status:false,error:error,messege:"not created successfully"})
    }


})

module.exports={
    route
}