const express =require("express");
const {Users} = require("../models/user")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


const admin=express.Router();

admin.post('/',(req,res)=>{

    res.status(200).json({status:true,messege:"come In"})
})

module.exports=admin