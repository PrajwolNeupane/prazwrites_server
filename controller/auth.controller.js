import User from "../modal/user.modal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import getUserInfo from "../helper/getUserInfo.js";

//getAuth
export async function getAuth(req, res) {
  try {
    if (req.user) {
      var user = await User.findById(req.user).select(["-password", "-__v"]);
      res.json({ user: user });
    } else {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  } catch (e) {
    res.status(500).json({
      message: "Cannot get auth",
    });
    console.log("Error on getAuth");
    console.log(e);
  }
}

//Create User
export async function createAdmin(req, res) {
  try {
    if (req.body.email && req.body.password) {
      var user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(409).json({
          message: "Invalid Email",
        });
        return;
      }
      user = new User({
        email: req.body.email,
        password: req.body.password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      user = await user.save();
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_TOKEN
      );
      res.cookie("access_token", token);
      res.json({
        message: "Admin User Created",
      });
    } else {
      res.status(400).json({
        message: "Provide Email and Password",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Cannot create admin",
    });
    console.log("Error on createAdmin");
    console.log(e);
  }
}

//Login
export async function logIn(req, res) {
  try {
    if (req.body.email && req.body.password) {
      var user = await User.findOne({ email: req.body.email });
      if (user) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (validPassword) {
          const token = jwt.sign(
            {
              id: user._id,
            },
            process.env.JWT_TOKEN
          );
          res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          });
          res.json({
            message: "Log In Successfully",
          });
        } else {
          return res
            .status(401)
            .json({ message: "Log In credentials invalid" });
        }
      } else {
        res.status(400).json({
          message: "Provide Email and Password",
        });
        return;
      }
    } else {
      res.status(400).json({
        message: "Provide Email and Password",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Cannot logIn",
    });
    console.log("Error on logIn");
    console.log(e);
  }
}

//Logout
export async function logOut(req, res) {
  try {
    var user = await getUserInfo(req.user);
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.clearCookie("access_token");
    res.json({
      message: "Logout Successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Cannot logout",
    });
    console.log("Error on logOut");
    console.log(e);
  }
}
