const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db.js');

const authRouter = require("./src/Routes/authRouter.js");
const productRouter = require("./src/Routes/productRouter.js");
const cartRouter = require("./src/Routes/cartRouter.js");
const orderRouter = require("./src/Routes/orderRouter.js");
const paymentRoutes = require("./src/Routes/paymentRoutes.js");

const app = express();

// ✅ Allowed origins मध्ये तुमची लाईव्ह फ्रंटएंड URL आणि लोकल होस्ट थेट जोडा
const allowedOrigins = [
  "https://shopverse-frontend-rilh.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",").map((o) => o.trim()) : [])
];

app.use(cors({
  origin: (origin, callback) => {
    // Postman किंवा server-to-server requests साठी origin undefined असू शकते
    if (!origin || allowedOrigins.includes(origin) || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// API Routes Setup
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/addCart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
};

startServer();