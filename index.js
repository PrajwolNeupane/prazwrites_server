import express from "express";
import cors from "cors";
import dbConnection from "./helper/dbConnection.js";
import AuthRoute from "./routes/auth.route.js";
import BlogRoute from "./routes/blog.route.js";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   })
// );
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/auth", AuthRoute);
app.use("/blog", BlogRoute);

const port = process.env.PORT || 8000;

app.listen(port, async () => {
  console.log("http://localhost:8000");
  console.log("Server is running on port 8000");
  await dbConnection;
});
