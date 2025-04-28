const express =require("express");

const loginRoute=express.Router();


loginRoute.post('/',(req,res)=>{

    const {username,password}=req.body;

    

   
})

module.exports={
    loginRoute
}