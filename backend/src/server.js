import express from "express";
import dontenv from "dotenv";
import cors from "cors";
import path from "path";

import noteroutes from "./routes/notesroutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middlewares/ratelimiter.js";

dontenv.config();


const app = express();
const port = process.env.port || 3000;
const __dirname = path.resolve();

connectDB();


if(process.env.NODE_ENV !== "production"){
  app.use(cors({
    origin: "http://localhost:5173",
  }));
}


app.use(express.json());
app.use(rateLimiter);


app.use("/api/notes", noteroutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html")); 

})

}
app.listen(port, () => {
  console.log("Server is running on port",port);
});


