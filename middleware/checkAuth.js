import "dotenv/config";
import jwt from "jsonwebtoken";

export default function (req, res, next) {
  if (req.cookies.access_token) {
    try {
      const decoded = jwt.verify(
        req.cookies.access_token,
        process.env.JWT_TOKEN
      );
      req.user = decoded.id;
    } catch (e) {
      console.log("Error on checkAuth");
      console.log(e);
      return res.status(401).json({ message: "Unauthorized", });
    }
    next();
  } else {
    res.status(401).json({ message: "Unauthorized",cookie:req.cookies.access_token });
  }
}
