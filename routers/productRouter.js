import express from "express"
import { createProduct, deleteProduct, getAllProducts, updateProduct,getProductById } from "../controllers/productController.js"

const  productRouter = express.Router()
// /search means it runs line by line ,mulinma / passe mokak hri thiyena eka run wei search ekata ynna klin e nisa /productId wage ewa awasenata danna one
productRouter.post("/" , createProduct)
productRouter.get("/" , getAllProducts)



productRouter.get("/search" , (req,res)=>{
    res.json({message : "Search endpoint"})
})
export default productRouter

//delete request eka lesiyen ywnna product Id ethanatama dala yawanawa
productRouter.delete("/:productId" ,deleteProduct)

productRouter.put("/:productId",updateProduct)

productRouter.get("/:productId" , getProductById)
