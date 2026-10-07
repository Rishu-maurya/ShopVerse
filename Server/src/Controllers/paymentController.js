const Razorpay = require("razorpay");
const crypto = require("crypto"); // Fixed spelling
const Order = require("../Model/order.js");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createPaymentOrder = async (req, res) => {
    try {
        const { amount, currency = "INR", receipt } = req.body;

        const options = {
            amount: amount * 100, // Amount in paise
            currency,
            receipt: receipt || `receipt_${Date.now()}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            message: "Razorpay order created successfully",
            order: razorpayOrder,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = req.body;

        // Signature Generate करें
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        // Signature Match चेक करें
        const isSignatureValid = generated_signature === razorpay_signature;

        if (!isSignatureValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid signature, payment verification failed"
            });
        }

        // Signature सही होने पर Database में Order का Payment Status अपडेट करें
        if (dbOrderId) {
            await Order.findByIdAndUpdate(dbOrderId, {
                paymentStatus: "Completed",
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature
            });
        }

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};