import mongoose from 'mongoose'//import mongoose module from mongoose package
//create schema before creating model
const studentSchema = new mongoose.Schema(
    {
        name : String,
        age : Number,
        city : String,
    }
)

//Create Student Remote
const Student = mongoose.model("student" ,studentSchema)//create model using schema

export default Student//export model to use in other files