
const bcrypt=require("bcrypt")

const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

   name:{
    type:String,
    required:true
   },
   
   email:{
    type:String,
    required:true,
    unique:true
   },
   phone:
   {
    type:Number,
    required:true,
    unique:true
   },
   password:
   {
      type:String,
      required:true,
   },
   role:
   {
      type:String,
      enum:["users","admin"],
      default:"users"
   }


},{timestamps:true})


userSchema.pre('save',async function(next){
   if(!this.isModified('password'))
         return next()

   const salt=await bcrypt.genSalt(10)
   this.password=await bcrypt.hash(this.password,salt);
   next();
})

const Users = mongoose.models.users || mongoose.model("users", userSchema);

module.exports={
   Users
}