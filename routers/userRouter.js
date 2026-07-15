import express from "express";
import {createUser, loginUser} from "../controllers/userController.js"//import {createStudent} from "../controller/userController.js"/


const userRouter = express.Router()//create a new router object using express.Router() method

userRouter.post("/",createUser)//create a new user using the createUser function from the userController.js file


userRouter.post("/login",loginUser)//post with different route

export default userRouter//export the userRouter object to be used in other files

//inside the userRouter we can add more routes for user related operations like get, update, delete etc.❤️❤️❤️❤️❤️