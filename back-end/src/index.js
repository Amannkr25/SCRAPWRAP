
const express=require('express')
const {route}=require('../src/routers/signUp')
const {loginRoute}=require('../src/routers/login')
const modelUsers=require("../src/models/user");
const mongoose=require('mongoose')
const app=express();

//const mongoURI = "mongodb://localhost:27017/yourDatabaseName"; 

mongoose.connect("mongodb://localhost:27017/scrapWrap").then(()=>{console.log("moogose is connect")}).catch((err)=>{"not connected",err})

app.get('/',(req,res)=>{

   console.log(req.query) ;
    res.json({name:req.query.name,age:req.query.age,gender:'male'});
})

app.use(express.json())
app.use('/signup',route);
app.use('/login',loginRoute)
app.listen(8000,()=>{console.log("okk server start")});
