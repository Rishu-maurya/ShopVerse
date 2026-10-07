const express = require('express')
const productRouter = express.Router()
const authMiddleware = require ('../middleware/auth.js')
const roleCheck = require ('../middleware/roleCheck.js')
const {productCreate, getAllProduct, getMyProducts, getProductById, productUpdate, productDelete}= require ("../Controllers/productController.js")

productRouter.post("/create", authMiddleware, roleCheck("dealer", "admin"), productCreate)
productRouter.get("/all",  getAllProduct)
productRouter.get("/my-products", authMiddleware, roleCheck("dealer", "admin"), getMyProducts)
productRouter.get("/:id",  getProductById)
productRouter.put("/update/:id",  authMiddleware, roleCheck("dealer", "admin"), productUpdate)
productRouter.delete("/delete/:id", authMiddleware, roleCheck("dealer", "admin"), productDelete)

module.exports = productRouter