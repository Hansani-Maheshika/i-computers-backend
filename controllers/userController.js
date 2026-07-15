import User from "../models/user.js";

import bcrypt from "bcrypt"//import bcryptjs module to hash the password before saving it to the database

import jwt from "jsonwebtoken"//import jsonwebtoken module to generate a token for the user after login

export async function createUser(req,res){//use async await to create a new user
    try {
        
        const user = await User.findOne//function in mongoose
        ({email : req.body.email})//find the user with the email in the request body
        
        if(user != null){//if user is not null, means user already exists
              res.json({message : "User already exists"})//send response to the client
              return //return to stop the function from executing further
        }
    // if use AI we can tell add vaidation to check if there is a user from this email
    //put value in if means always true 



//password : "$2b$10$KeDSFkjU.ItXok5kzA5SpepRfsN6QnYjvCOP8JwazfHppNB4mq.Ji"
//$2b$10 means 10 salt rounds, it is a good practice to use at least 10 salt rounds to hash the password
//the salt is a random string that is added to the password before hashing it, this makes it more secure and harder to crack the password using brute force attacks
const passwordHash =  bcrypt.hashSync(req.body.password,10)//hash the password using bcryptjs module with 10 salt rounds

console.log(passwordHash)//print the hashed password to the console


    //create user
       
    //if we use below code means based on req body anyone can create a user with any email
   //const newUser = new User(req.body)//create new user using the model and the data from the request body.can create any account no secure
        
        const newUser = new User({
            //create new user using the model and the data from the request body only for email, firstname, lastname and password. This is more secure than using req.body directly
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: passwordHash//it is not a good practice to store password in plain text, we can use bcrypt to hash the password before saving it to the database
        })
        await newUser.save().then(//save the new user to the database,await is used to wait for the save operation to complete before sending the response to the client
            ()=>{
                res.json({
                    message: "User added successfully"
                })
            }
        )

        }catch(err){
        res.json({message: err.message}
            
        )
    }
}//inside userController we can add more functions for user related operations like get, update, delete etc.

export async function loginUser(req,res){//use async await to login a user
    try {
        const email = req.body.email//get the email from the request body
        const password = req.body.password//get the password from the request body

        if(email == null || password == null){//if email or password is null, means user did not provide email or password
            //res.json({message : "Email and password are required"})//send response to the client
            //add status code when request fail
            res.status(400).json({message : "Email and password are required"})
            
            return //return to stop the function from executing further
        }

        const user = await User.findOne( {email : email})//find the user with the email in the request body

        if(user == null){//if user is null, means user does not exist
            //res.json({message : "User not found"})//send response to the client
            res.status(404).json({message : "User not found"})
            
            return //return to stop the function from executing further
        }

        const isPasswordValid = bcrypt.compareSync(password,user.password)//compare the password from the request body with the hashed password in the database using bcryptjs module
        if(isPasswordValid){

            const token = jwt.sign(
                {
                    email : user.email,
                    firstname : user.firstname,
                    lastname : user.lastname,
                    isAdmin : user.isAdmin,
                    isBlocked : user.isBlocked,
                    isEmailVerified : user.isEmailVerified,
                    image : user.image
                },//using the above data to generate a token for the user after login
                "secretkey9911111",//secret key to sign the token, it should be kept secret and not shared with anyone, we can use environment variable to store the secret key
            )

            res.json({message : "login successful", token : token})//send response to the client with the token

        }else{
            //res.json({message : "Invalid password"})
            res.status(401).json({message : "Invalid password"})
        }

    }catch(err){
        res.json({message: err.message})
    }
}