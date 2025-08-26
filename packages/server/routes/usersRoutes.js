import express from "express";  
import { registerUser, loginUser } from "../controllers/usersController.js";

const router = express.Router();

router.post("/users/signin",loginUser);   
router.post("/users/signup",registerUser);   

export default router;