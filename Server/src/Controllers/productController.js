const Product = require("../Model/Product.js");

const productCreate = async (req, res) => {
    try {
        const { name, description, price, category, stock, images } = req.body;


        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "Please fill all required fields" })
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            images,
            createdBy: req.userId
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: newProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find()
        return res.status(200).json({
            success: true,
            count: products.length,
            products
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

const getMyProducts = async (req,res) => {
    try {
        const products = await Product.find({ createdBy:req.userId })
        return res.status(200).json({
            success: true,
            message: "My Product are fetched successfully",
            count: products.length,
            products
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        } else {
            return res.status(200).json({
                success: true,
                product
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const productUpdate = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id)

        if (!product) {
            return res. status(404).json({
                message: "Product not found"
            })
        }

        if (req.userRole !== "admin" && product.createdBy.toString() !== req.userId) {
            return res.status(403).json({
                message: "You are not authorized to update this product"
            })
        }

        const allowedFields = ["name", "description", "price", "category", "stock", "images"]
        const updates = {}
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field]
            }
        })

        const updateProduct = await Product.findByIdAndUpdate(id, updates, {
            returnDocument: 'after', runValidators: true
        })

        if (!updateProduct) {

            return res.status(404).json({ message: "Product not found" })
        } else {
            return res.status(200).json({
                success: true,
                message: "Product updated successfully",
                product: updateProduct
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const productDelete = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        if (req.userRole !== "admin" && product.createdBy.toString() !== req.userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this product"
            })
        }

        await Product.findByIdAndDelete(id)

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { productCreate, getAllProduct, getMyProducts, getProductById, productUpdate, productDelete } 