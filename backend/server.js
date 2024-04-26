import express from "express";
import dotenv from "dotenv";
import dataRoutes from "./routes/data.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from './routes/auth.routes.js'
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use("/api/data", dataRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server running on port", PORT);
});
