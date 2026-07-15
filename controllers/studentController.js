import Student from '../models/student.js'//import student model from models/student.js file

 export function getAllStudents(req,res){
        Student.find().then(
            (students)=>{
                res.json(students)
            }
        )
    }




export function createStudent(req,res) {
        
       //console.log(req.user); //to get user's information
        if(req.user == null){
            res.status(401).json({ message : "Unauthorized"})
            return
        } 
        if(req.user.isAdmin == false){//request eka ewana user admin kenekda ynna balanawa
            res.status(401).json({ message : "Only admin can create student "})
            return
        }
        //the above part is authorization part

            const newStudent = new Student(req.body)//create new student using the model and the data from the request body
            newStudent.save().then(
                ()=>{
                    res.json({
                        message: "Student added successfully"
                    })
                }
            )
        }
        export async function getAllstudents(req,res){//use async await to get all students from the database
            try{//use try catch not to crash the server if there is an error
                const students = await Student.find()
                res.json(students)
            }catch(err){
                res.status(500).json({message: err.message})
            }
        }