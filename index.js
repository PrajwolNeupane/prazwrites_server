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
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use("/auth", AuthRoute);
app.use("/blog", BlogRoute);

const port = process.env.PORT || 8000;

app.listen(port, async () => {
  console.log("http://localhost:8000");
  console.log("Server is running on port 8000");
  await dbConnection;
});
