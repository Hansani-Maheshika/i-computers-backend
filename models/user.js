import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    { //attributes of the user model
        //email: string,
        //put json to explain email attribute
        email:{
            type: String,
            unique:true,//only one user can have the same email,no multiple users with the same email
            required: true//email is required to create a user
        },
       
        firstname: {
            type : String,
            required: true
        },
        lastname: {
            type : String,
            required: true
        },
        password: {
            type : String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false//put default value to false so that when a user is created, it is not an admin by default
        },
        isBlocked: {
            type: Boolean,
            required: true,
            default: false//not blocked by default
        },
        isEmailVerified: {//can go forward if email is not verified, but can not access some features of the app
            type: Boolean,
            required: true,
            default: false
        },
        image: {//not ask image in registration process
            type: String,
            required: true,
            default: "/default-profile.png"

        }
       
    }

);

const User = mongoose.model('User', userSchema);//create a model called User using the userSchema

//steps to create a user model
//1. create a schema using mongoose.Schema
//2. create a model using mongoose.model and pass the schema to it
//3. export the model so that it can be used in other files
export default User//export the User model to be used in other files

//inside the user model we can add more attributes like address, phone number, etc. and also we can add methods to the model like comparePassword, generateAuthToken, etc.
