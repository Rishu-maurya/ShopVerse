const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db.js');

const authRouter = require("./src/Routes/authRouter.js");
const productRouter = require("./src/Routes/productRouter.js");
const cartRouter = require("./src/Routes/cartRouter.js");
const orderRouter = require("./src/Routes/oderRouter.js");
const paymentRoutes = require("./src/Routes/paymentRoutes.js");

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim());

app.use(cors({
  origin: (origin, callback) => {
    const isLocalDevelopmentOrigin =
      origin && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

    if (!origin || isLocalDevelopmentOrigin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: true
}));

app.use(express.json());




// API Routes Setup
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/addCart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});
const startServer = async () => {
  const db = await connectDB();


  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    return db
  });

}

startServer();

