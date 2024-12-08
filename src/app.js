const express =require("express");
const expressJson=require("express-json")
const connectDb=require("./config/database")
const app=express();
app.use(express.json())
const User=require("./models/user")
const byCrypt=require("bcrypt")


app.post("/signup",async(req,res)=>{
    console.log("req",req.body)
// never trust req.body

//validate the data

// encrypt the password
const {name,email,password}=req.body
const passwordHash= await byCrypt.hash(password,1,)
    const user=new User({
        name,email,password:passwordHash
    })
  

try{
    await  user.save()
    res.send("data added successfully",)
}catch(err){

    res.send("oops ,something went wrong",err)
}


})

app.post("/login",async(req,res)=>{

const {email,password}=req.body

console.log("email",email)
const user= await User.findOne({email})
  console.log("user",user)
  let isPasswordCorrect=false

  if(user){
     isPasswordCorrect= await byCrypt.compare(password,user?.password);
    console.log("isPasswordCorrect",isPasswordCorrect)
  }


try{
   if(isPasswordCorrect){
    res.send("login successful",)
   }else{
    res.send("userDesnot exist")
   }
}catch(err){
    res.send("oops ,something went wrong",err)
}
})


connectDb().then(()=>{
    console.log("database connect successful")
    
app.listen(3000,()=>{
    console.log("server is listening on port 3000")
})
}).catch(()=>{
    console.log("database connect failed")
})
app.use(express.json())






