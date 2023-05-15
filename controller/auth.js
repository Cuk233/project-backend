const db = require("../models");
const User = db.User;
const path = require("path");
const User_profile = db.User_profile;
const User_verification = db.User_verification;
dotenv = require("dotenv").config({ path: path.resolve("../.env") });

//import
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./project");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.passw,
  },
});

const AuthControllers = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      //check email
      const isEmailExist = await User.findOne({
        where: { email },
      });

      const isUsernameExist = await User.findOne({
        where: { username },
      });

      if (isEmailExist) {
        return res.status(409).json({
          message: "email already exist",
        });
      }
      if (isUsernameExist) {
        return res.status(409).json({
          message: "This username is already taken",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      await User.create({ username, email, password: hashPassword });
      const users = await User.findOne({ where: { username: username } });
      await User_profile.create({
        user_id: users.id,
        username,
        email,
        password: hashPassword,
      });
      let payload = { id: email, username: username };
      const token = jwt.sign(payload, process.env.signature, {
        expiresIn: "1h",
      });
      const mailOptions = {
        from: process.env.username,
        to: email,
        subject: "Email Verification",
        html: `<p>Hello ${username},</p><p>Please verify your email address by clicking this link: <a href="http://localhost:3001/auth/verify-email/${token}">Verify Email</a></p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: "failed to send verification email",
          });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(201).json({
            message: "user created successfully",
          });
        }
      });

      return res.status(200).json({
        message: "Register success",
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statuscode || 500).json({
        message: err.message,
      });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const token = req.params.id;
      const decodedToken = jwt.verify(token, process.env.signature);
      const user = await User.findOne({
        where: { username: decodedToken.username },
      });
      const isUserIDExist = await User_verification.findOne({
        where: { user_id: user.id },
      });
      const user_id = user.id;
      if (!user) {
        return res.status(409).json({
          message: "invalid verification token",
        });
      }

      if (isUserIDExist) {
        return res.status(409).json({
          message: "User is already verified",
        });
      }

      await User_verification.create({ user_id, verified: true });
      return res.status(200).json({
        message: "email verification successful",
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statuscode || 500).json({
        message: err.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { emailOrUsername, password } = req.body;
      let checkUser = null;
      if (emailOrUsername.includes("@")) {
        checkUser = await User.findOne({ where: { email: emailOrUsername } });
      } else {
        checkUser = await User.findOne({
          where: { username: emailOrUsername },
        });
      }

      if (!checkUser) {
        return res.status(409).json({
          message: "no user found",
        });
      }

      const checkPassword = await bcrypt.compare(password, checkUser.password);
      if (!checkPassword) {
        return res.status(409).json({
          message: "password is incorrect",
        });
      }

      let payload = { id: checkUser.id, username: checkUser.username };
      const token = jwt.sign(payload, process.env.signature, {
        expiresIn: "5h",
      });

      localStorage.setItem("token", token);

      return res.status(200).json({
        token,
        message: "login success",
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statuscode || 500).json({
        message: err.message,
      });
    }
  },

  findAllUser: async (req, res) => {
    try {
      const users = await User.findAll({ raw: true });
      return res.status(200).json({
        result: users,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statuscode || 500).json({
        message: err.message,
      });
    }
  },
};

module.exports = AuthControllers;
