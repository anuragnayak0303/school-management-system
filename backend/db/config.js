import mongoose from "mongoose";
import "dotenv/config"
import chalk from "chalk"

const connectDB = async()=>{
    try {
       let conn = await mongoose.connect(process.env.MONGO_URL)
       if(conn)
         console.log(chalk.yellow("Database server connected..."))
         
    } catch (error) {
       console.log(error) 
    }
} 
export default connectDB;