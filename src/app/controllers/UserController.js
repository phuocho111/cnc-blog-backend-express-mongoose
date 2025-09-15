const User = require("../models/User");
const { mongooseToObject } = require("../../util/mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { multiplemongooseToObject } = require("../../util/mongoose");

class UserController {
  // [POST] /register create user
  async register(req, res, next) {
    try {
      const { username, email, password, confirmPassword, fullName, dateOfBirth, avatarImageUrl } =
        req.body;
      if (
        !username ||
        !email ||
        !password ||
        !confirmPassword ||
        !fullName ||
        !dateOfBirth ||
        !avatarImageUrl
      ) {
        res.status(400).json({ status: 400, message: "All fields are mandatory!" });
      }
      const userAvailable = await User.findOne({ username });
      if (userAvailable) {
        res.status(400).json({ status: 400, message: "User already registered!" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        fullName,
        dateOfBirth,
        avatarImageUrl,
      });
      if (user) {
        // res.status(201).json({ _id: user.id, email: user.email });
        res.status(201).json({ message: "User registered successfully" });
      } else {
        res.status(400).json({ status: 400, message: "User data us not valid!" });
      }
    } catch (err) {
      next(err);
    }
  }
  // [POST] /login accessToken
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ status: 400, message: "All fields are mandatory!" });
      }
      const user = await User.findOne({
        username,
      });
      // Compare password with hashed password
      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              id: user.id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30d" },
        );
        res.status(200).json({
          token: accessToken,
          userId: user.id,
        });
      } else {
        res.status(401).json({ status: 401, message: "Username or password is not valid" });
      }
    } catch (err) {
      next(err);
    }
  }
  // [GET] /current
  async profile(req, res, next) {
    try {
      res.json(req.user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
