const mongoose = require('mongoose')

const Product = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Please enter product description"],
        },
        price: {
            type: Number,
            required: [true, "Please enter product price"],
            min: [0, "Price cannot be negative"],
        },
        category: {
            type: String,
            required: [true, "Please enter product category"],
        },
        stock: {
            type: Number,
            required: [true, "Please enter product stock"],
            default: 0,
        },
        images: [
            {
                type: String, 
            },
        ],

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true, 
    }

)

module.exports = mongoose.model("Product",Product)