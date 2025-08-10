import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import adminRoute from "./src/routes/admin.routes.js";
import productRoute from "./src/routes/product.routes.js";
import cartRoute from "./src/routes/cart.routes.js";
import userRoute from "./src/routes/user.routes.js";
import orderRoute from "./src/routes/order.routes.js";
import ShippingDetail from "./src/routes/shippingDetail.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// ✅ Manual CORS headers
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://shopping-store-frontend-chi.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/v1", productRoute);
app.use("/api/v1", cartRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", ShippingDetail);

// DB connect and server start
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection failed!", err);
  });
