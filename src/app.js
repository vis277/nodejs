const express =require("express");
const expressJson=require("express-json")
const connectDb=require("./config/database")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const app=express();

app.use(express.json())
app.use(cookieParser())
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

const user= await User.findOne({email})
  console.log("user ln 44",user)
  let isPasswordCorrect=false

  if(user){
     isPasswordCorrect= await byCrypt.compare(password,user?.password);
     if(isPasswordCorrect){
        const jwtToken=await jwt.sign({_id:user._id},"mySecretKey");
        console.log("jwtToken",jwtToken)
       console.log("isPasswordCorrect",isPasswordCorrect)
       res.cookie("token",jwtToken)
     }else{
        res.send("password incorrect")
        return
     }
   
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


app.get("/profile",async(req,res)=>{
const {token}=req.cookies
if(!token){
   res.send("token not present")
   return
}
console.log("toke",token);
const userId= await jwt.verify(token,"mySecretKey");
console.log("userID",userId._id)
const userLoggedIn= await User.findById({_id:userId._id})
console.log("userLoggedIn",userLoggedIn)
    try{
res.send(userLoggedIn)
    }catch(err){
res.send("invalid token")
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







