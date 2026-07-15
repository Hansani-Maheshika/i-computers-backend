import express from 'express'//import express module from express 

import{ getAllStudents, createStudent } from '../controllers/studentController.js'//import getAllStudents and createStudent functions from controllers/studentController.js file





const studentRouter = express.Router()//create an instance of express router module and store it in studentRouter 


studentRouter.get('/',getAllStudents)//use getAllStudents function for all get requests starting with /students

studentRouter.post('/',createStudent)//use createStudent function for all post requests starting with /students
//     '/',
//     (req,res)=>{
//         const newStudent = new Student(req.body)//create new student using the model and the data from the request body
//         newStudent.save().then(
//             ()=>{
//                 res.json({
//                     message: "Student added successfully"
//                 })
//             }
//         )
//     }
// )

export default studentRouter//export studentRouter to use in other files