import express from "express";
import User from "../models/userController.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()


export const registerUser = async (req, res) => {
    const {fullName, email, password, confirmPassword} = req.body;
    try {
      if(!fullName || !email || !password || !confirmPassword){
        return res.status(400).json({success:false,message:'Fields are required'})
      }
      if(password !== confirmPassword){
        return res.status(400).json({success:false,message:'Password does not match'})
      }
       const user =  await User.findOne({email})
       if(user){
        return res.status(400).json({success:false,message:'User already exists'})
       }
       const newUser = await new User({fullName, email, password})
       await newUser.save()
       return res.status(201).json({success:true, message:'User registered successfully'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({message:'Internal Server Error'})
    }
  }

  export const loginUser = async (req, res) => {
   const {email, password} = req.body;
   try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({success:false,message:'User not found'})
    }
    const isMatch = await user.matchPassword(password) // Changed from comparePassword to matchPassword
    if(!isMatch){
      return res.status(400).json({success:false,message:'Invalid credentials'})
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.status(201).json({success:true, message:'User logged in successfully',data:{id:user._id, fullName:user.fullName, email:user.email,token}})
    // req.session.userId = user._id // This line might cause issues if session is not configured
   } catch (error) {
      console.log(error);
      return res.status(500).json({message:'Internal Server Error'})
   }

  }