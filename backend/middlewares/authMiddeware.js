import jwt from "jsonwebtoken"
import "dotenv/config"
import userModel from "../models/userModel.js"
// signIn
export const isSignIn = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token)
        if (!token) {
            res.status(404).json({ message: "Token not provided!" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded) {
            req.user = decoded._id;
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Invlaid token' })
    }
}

// isAdmin
export const isAdmin = async(req,res,next)=>{
    try {
         const user = await userModel.findOne({_id:req?.user})
        //  console.log(user?.role)
         if(user?.role!=="Admin")
         {
            return res.status(401).json({
                success:false,
                message:"You are not admin!"
            })      
         }
         else{
            next()
         }
    } catch (error) {
        console.log(error)
    }
}