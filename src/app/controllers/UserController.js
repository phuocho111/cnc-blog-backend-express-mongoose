const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
};

// [POST] /register create user
const register = async (req, res, next) => {
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
};
// [POST] /login accessToken
const login = async (req, res, next) => {
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
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      const isProduction = process.env.ENV_DEPLOY === "production";
      // Lưu refreshToken vào DB
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      await user.save();

      // Set cookie HttpOnly
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "strict",
        path: "/",
        maxAge: 1 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60 * 1000,
      });

      res.status(200).json({
        userId: user.id,
        userRole: "user",
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({ status: 401, message: "Username or password is not valid" });
    }
  } catch (err) {
    next(err);
  }
};
//[POST] / log out
const logOut = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    await User.findOneAndUpdate({ accessToken }, { accessToken: null });
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });
    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("refreshToken", { path: "/" });
    res.status(200).send({ message: "Logged out successfully." });
  } catch (error) {
    res.status(500).send({ error: "Failed to log out." });
  }
};
//[POST] / refresh
const refresh = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) return res.sendStatus(401);

  // check DB
  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = this.generateAccessToken(user);

    return res.json({ accessToken: newAccessToken });
  });
};
// [GET] /current
const profile = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logOut,
  refresh,
  profile,
};
