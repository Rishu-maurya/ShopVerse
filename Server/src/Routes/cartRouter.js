const express = require('express')
const {addToCart, getCart, removeFromCart, updateQuantity, clearCart} = require('../Controllers/cartController')
const authMiddleware = require ('../middleware/auth.js')
const cartRouter = express.Router()

cartRouter.post("/addToCart", authMiddleware, addToCart)
cartRouter.get("/getCart/", authMiddleware, getCart)
cartRouter.delete("/removeCartProduct/",authMiddleware, removeFromCart)
cartRouter.put("/updateQuantity",authMiddleware, updateQuantity)


module.exports = cartRouter