const Cart = require('../Model/cart')

const addToCart = async (req, res) => {
    try {
        const userId = req.userId
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId })

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{ product: productId, quantity: Number(quantity) }]
            })
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.product.toString() === productId
            )

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += (Number(quantity) || 1)
            } else {
                cart.items.push({ product: productId, quantity: Number(quantity) || 1 })
            }
        }
        await cart.save()
        await cart.populate("items.product")

        return res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            cart
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getCart = async (req, res) => {
    try {
        const userId = req.userId
        const cart = await Cart.findOne({ user: userId }).populate("items.product")
        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                cart: { items: [] }
            })
        }
        return res.status(200).json({
            success: true,
            message: "Cart retrieved successfully",
            cart
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const removeFromCart = async (req, res) => {

    try {
        const userId = req.userId
        const { productId } = req.body

        const cart = await Cart.findOne({ user: userId })

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId)

        await cart.save()
        await cart.populate("items.product")

        return res.status(200).json({
            success: true,
            message: "Product remove successfully",
            cart
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateQuantity = async (req, res) => {
    try {
        const userId = req.userId
        const { productId, quantity } = req.body

        const cart = await Cart.findOne({ user: userId })

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        )

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity
        } else {
            return res.status(404).json({ message: "CartIndex not found" })
        }

        await cart.save()

        return res.status(200).json({
            success: true,
            message: "Quantity updated",
            cart
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const clearCart = async (req,res) => {
    try{
        const userId = req.userId
        
        const cart = await Cart.findOne({user: userId})

        if (!cart) {
            return res.status(404).json({
                success : false,
                message: "Cart not Found"})
        }
        cart.items =[]
        await cart.save()

        return res.status(200).json({
            success: true,
            message: "Cart clear Successfully"
        })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { addToCart, getCart, removeFromCart, updateQuantity, clearCart }