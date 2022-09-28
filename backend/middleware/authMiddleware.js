const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("not authorized, no token");
  }
});
const ifBlocked = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.body.status) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userr = await User.findById(decoded.id).select("-password");

    if (userr && req.body.status && userr.status === "active") {
      console.log("authorized");
      next();
    } else {
      res.status(401);
      throw new Error("User blocked");
    }
  } else {
    const { email, name } = req.body;
    const userrr = await User.findOne({ email: email });

    if (userrr && req.body.status && userrr.status === "active") {
      console.log("authorized");
      next();
    } else {
      res.status(401);
      throw new Error("User blocked");
    }
  }
});

module.exports = {
  protect,
  ifBlocked,
};
