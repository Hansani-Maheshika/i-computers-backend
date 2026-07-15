import express from 'express'//import express module from express package

import mongoose from 'mongoose'//import mongoose module from mongoose package

////import student model from models/student.js file

//import studentRouter from './routers/studentRouter.js'//import studentRouter from routers/studentRouter.js file

import userRouter from './routers/userRouter.js'//import userRouter from routers/userRouter.js file
import productRouter from './routers/productRouter.js'

import authenticate from './middlewares/authenticate.js'
//First step to connect project with database
const mongoDBURL = "mongodb://Hansani:hdhm123@ac-g0wvtjq-shard-00-00.c8ttl8a.mongodb.net:27017,ac-g0wvtjq-shard-00-01.c8ttl8a.mongodb.net:27017,ac-g0wvtjq-shard-00-02.c8ttl8a.mongodb.net:27017/dev?ssl=true&replicaSet=atlas-ejrxv8-shard-0&authSource=admin&appName=Cluster0"

mongoose.connect(mongoDBURL).then(
    ()=>{
        console.log('Database connected successfully')
    }
 )

//cannot change value of app

const app = express()//create an instance of express module(framework) and store it in app variable


app.use(express.json())//middleware to parse the body of the request

app.use(authenticate)
    
//******************************************************************************************* */
app.use('/users' ,userRouter)//use userRouter for all requests starting with /users

app.use("/products" , productRouter)

app.use('/students',studentRouter)//use studentRouter for all requests starting with /students


//register (note down) the work from get request
app.get('/',

    (req,res)=>{
       console.log('Get request received')
       console.log(req)
       //inside the req object we have a lot of information about the request that was made to the server

       //retrive all students from the database
       Student.find().then(

          (students)=>{

            res.json(students)

        })
    }
)


app.post('/',

    (req,res)=>{

        //database 
        const newStudent = new Student(req.body)//create new student using the model and the data from the request body

        newStudent.save().then(
            ()=>{
                res.json({
                    message: "Student added successfully"
                })
            }
        )

        const message = "Hi "+req.body.name +" "+req.body.Location
        console.log(message)//print message to the console


        console.log('Post request received')
        //Didnot print body because we have not added middleware to parse the body of the request 
        console.log(req.body.name)//to get name from the body of request

        res.json({
            message: message
        })



      
    }
)
//app how react when getting http get and post request

app.put('/',

    ()=>{
        console.log('Put request received')
    }
)

app.delete('/',

    ()=>{
        console.log('Delete request received')
    }
)

//start the app
app.listen(
    3000,
    ()=>{
          console.log('Server started successfully')
          console.log('Server is running on port 3000')
    }
)

// function success() {
//   console.log('Server is running on port 3000')
// }


// app.listen(3000, success)


