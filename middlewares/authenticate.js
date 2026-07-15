import jwt from "jsonwebtoken"

export default function authenticate(req, res , next){

        // console.log("Middleware executed")
        // next()//send this request work to next
        const header = req.header("Authorization")//give header of the request
        //console.log(header)
        
        if(header == null){ //the person who is coming first for create a account
            next()
         } else{
             const token = header.replace("Bearer ", "")//remove Bearer and space and print correct token
             //console.log(token)

             //Now decrypt the token
             jwt.verify(token , "secretkey9911111",//secret key is wanted to decode
                (err , decoded)=>{//get err and decoded value
                    console.log(decoded)

                    if (decoded == null){//
                        res.sendStatus(401).json({message : "Invalid token please login again"})
                    }else{

                        req.user = decoded//req ekata userge wistara(decoded) tika dala next  yawanawa
                        next()

                    }

                }
             )
         
            }
            
        }

    

