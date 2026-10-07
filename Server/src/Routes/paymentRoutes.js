const express = require("express");
const router = express.Router();
const { createPaymentOrder, verifyPayment } = require("../Controllers/paymentController");
const authMiddleware = require("../middleware/auth.js");

router.post("/create-order", authMiddleware, createPaymentOrder);
router.post("/verify-payment", authMiddleware, verifyPayment);

module.exports = router;