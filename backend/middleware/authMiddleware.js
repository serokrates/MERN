// middleware is a function that runs during the request response cycle
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // istnieje header authorization i w tym headerze jak przesyłamy token to on się zaczyna na Bearer czyli dzierżca tokenu
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      // Bearer' 'tokenxyz więc token ma index 1
      token = req.headers.authorization.split(" ")[1];
      // verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      // get user from the token bo token jwt składa się z trzech części: header, payload i verify signature. W payload jest id bearera
      // .select('-password') bez password
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);
      // calling next piece of middleware
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
  console.log("bodybodybodybodybodybodybodybodybodybodybody", req);
  if (req.headers.authorization && req.body.status) {
    console.log("bodybodybodybodybodybodybodybodybodybodybody", req);
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
    // find email of the user
    const userrr = await User.findOne({ email: email });

    console.log(userrr.status);
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
