const express = require("express");
const { createOrder, getUserOrder , getOrderById } = require("../Controllers/orderController.js");
const authMiddleware = require("../middleware/auth.js");
const orderRouter = express.Router();

orderRouter.post("/createOrder", authMiddleware, createOrder);
orderRouter.get("/getUserOrder", authMiddleware, getUserOrder);
orderRouter.get("/getOrderById/:id", authMiddleware, getOrderById);

module.exports = orderRouter;