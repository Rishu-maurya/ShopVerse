const Order = require('../Model/order')
const Cart = require('../Model/cart')
const Razerpay = require("razorpay");

const razorpay = new Razerpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


const createOrder = async (req, res) => {
    try{
        const userId = req.userId
        const {address, city, postalCode, country} = req.body

        const cart = await Cart.findOne({user: userId}).populate("items.product")

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({message: "Bad request"})
        }

        let totalAmount = 0
        cart.items.forEach((item) => {
            totalAmount += item.product.price * item.quantity            
        });

        const orderItems = cart.items.map((items) => ({
            product: items.product._id,
            quantity: items.quantity,
            price: items.product.price
        }))

        const order = new Order({
            user: userId,
            items: orderItems,
            shippingAddress: {address, city, postalCode, country},
            totalAmount
        })

        await order.save()

        cart.items =[]
        await cart.save()

        return res.status(200).json({
            message: "Order placed succesfully",
            order
        })
    }catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getUserOrder = async (req,res) => {
    try {
        const userId = req.userId
        
        const orders = await Order.find({user: userId}).populate("items.product").sort({ createdAt: -1})

        if (!orders || orders.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No order found",
                orders: []
            })
        }

        return res.status(200).json({
            success : true,
            count : orders.length,
            orders
        })
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getOrderById = async (req, res) => {
    try{
        const userId = req.userId

        const orderId = req.params.id

        const order = await Order.findOne({user: userId, _id: orderId})
        .populate("items.product")

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "order not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {createOrder, getUserOrder, getOrderById}