import dotenv from "dotenv";
dotenv.config(); // MUST run first

import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.route";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "Loaded ✅" : "Missing ❌");

