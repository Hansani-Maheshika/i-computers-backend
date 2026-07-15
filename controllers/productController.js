//we added product create,read,update,delete funtions


import Product from "../models/product.js"


export async function createProduct(req,res){

   if(req.user == null){
    //checking user is here or not,identify user
    res.status(401).json({message : "Unauthorized"})
    return

   }

    if(!req.user.isAdmin){//admin noweda ! means 
        res.status(403).json({message : "Only admin can create a product"})
        return
        
    }
//checking the product ID
try{
   // checking if the the products are available with this product ID
   const existingProduct = await Product.findOne( {productId : req.body.productId} )
    
   if(existingProduct !=null){
        res.status(400).json({message : "Product with this productId already exists"})
        return
    } 

    const product = new Product(req.body)//crate product with req.body information
    
    await product.save().then(
                ()=>{
                    res.json({
                        message: "Product created successfully"
                    })
                }
            )

    

}catch(err){
    res.status(500).json({message : err.message})
   
}

}

export async function getAllProducts(req,res){

    try{// products tika hewwa front end ekta dagtta
        //if we put like this if coming null user then system ccrashed so we need to 1st check the user null or not
        //if(req.user.isAdmin){}
        
        
        //1st need to user available in request and he need to be admin
        if(req.user !=null &&  req.user.isAdmin){
            
            const products = await Product.find()
            res.json(products)//give all products
        }else{//admin nowenm available ewa witharak denna
            const products = await Product.find( {isAvailable : true})
            res.json(products)

        }



    }catch(err){
        res,status(500).json({message : err.message})
    }
}
export async function deleteProduct(req,res){

    if(req.user != null && req.user.isAdmin){

        try{
//1st check is there an available product which we want to delete
            const product = await Product.findOne( {productId : req.params.productId})
            if(product == null){
                res.status(404).json({message : "Product not found"})
                return
            }

            await Product.deleteOne( {productId : req.params.productId})
            res.json({message : "Product deleteted successfully"})
        
        }catch(err){
            res.status(500).json({message : err.message})
        }
    


    }else{
        res.status(403).json({message : "Only admins can delete products"})
        return

    }
}

//new information for update we need to put in Body but the key is put as a parameter in http request
export async function updateProduct(req,res){
    if(req.user != null && req.user.isAdmin){

        try {
            if(req.body.productId != null){
                res.status(400).json({message : "ProductId cannot be updated "})
                return
            }

            await Product.updateOne({productId : req.params.productId} ,req.body )
        
        }catch(err){
            res.status(500).json({message:err.message})
        }


    }else{
        res.status(403).json({message : "Only admins can update products"})
        return

    }
}
//this function is made to retrive information about a one particular product
export async function getProductById(req,res){
    try{
//find the product that belongs to the needed productId
        const product = await Product.findOne( {productId : req.params.productId})
        
        
        if(product == null){
            res.status(404).json({message : "Product not found "})
            return

        if(product.isAvailable){//Available nam yawanawa wistara
            res.json(product)
        }

        //unavailable product wala wistara adminla witharai blnna puluwn
        }else{

            
            if(req.user !=null && req.user.isAdmin){

                res.json(product)

            }else{
                res.status(403).json({message : "Only admins can view unavailable products"})
                return
            }
        

            }
        }catch(err){
            res.status(500).json({message:err.message})
        }
}

