import userModel from "../models/userModel.js";
import { hashedPassword, comparePassword } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

//REGISTER CONTROLLER
export const registerController = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const hashPass = await hashedPassword(req.body.password);
    const user = new userModel({
      name,
      email,
      password: hashPass,
      role,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: "Registeration successful!!",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while register a user...",
      error,
    });
  }
};

//LOGIN CONTROLLER
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        message: "Email and password is required!",
      });
    }
    // //EXISTING USER
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Not registered. Please register first!" });
    }

    const match = await comparePassword(password, existingUser?.password);
    if (!match) {
      return res.status(401).json({ message: "invalid credentials!" });
    }

    // JWT TOKEN
    const token = jwt.sign(
      { _id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      success: true,
      message: "Login successfull!",
      token,
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "error while login...",
      error,
    });
  }
};

export const EmailVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const Isemail = await userModel.findOne({ email });
    if (!Isemail) {
      return res
        .status(201)
        .send({ success: false, message: "Email Is Incorrect !!" });
    }
    return res.status(201).send({ success: true, message: "OTP Sent " });
  } catch (error) {
    console.log(error);
  }
};

export const passwordmatch = async (req, res) => {
  try {
    const user = await userModel.findById(req.user);
    console.log(req.body.oldPassword)
    console.log(user)

    const ismatch = await comparePassword(req.body.oldPassword, user?.password);
    console.log(ismatch);
    if (!ismatch) {
      return res.send({ success: false, message: "Password Invaild !!" });
    }
    return res.send({ success: true, message: "password matched " });
  } catch (error) {
    console.log(error);
  }
};

export const forgetpassowrd = async (req, res) => {
  try {
    const { newPassword } = req.body;
    console.log(newPassword)
    await userModel.findByIdAndUpdate(req.user, {
      password: await hashedPassword(newPassword),
    });
    return res.send({ success: true, message: "password Forget Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getSigngleUser = async (req, res) => {
  try {
    const data = await userModel.findById(req.user)
    res.send(data)
  } catch (error) {
    console.log(error)
  }
}
