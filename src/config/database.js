const mongoose=require("mongoose")


const connectDb=async()=>{
await mongoose.connect("mongodb+srv://vkvishal277:sfjhanzFDG25Bocs@cluster0.ior82.mongodb.net/dummyData")
}


module.exports=connectDb
