import express from "express";
import dontenv from "dotenv";
import cors from "cors";

import noteroutes from "./routes/notesroutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middlewares/ratelimiter.js";

dontenv.config();


const app = express();
const port = process.env.port || 3000;

connectDB();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteroutes);

app.listen(port, () => {
  console.log("Server is running on port",port);
});


