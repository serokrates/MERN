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
const ifBlocked2 = asyncHandler(async (req, res, next) => {
  // console.log(req.query.id);
  // const userrr = await User.findById(req.query.id);
  // console.log(userrr.status);

  // if (userrr.status === "active") {
  //   // console.log("authorized");
  //   // next();

  //   try {
  //     console.log("authorized");
  //     next();
  //   } catch (error) {
  //     // }else {
  //     //   // console.log(error);
  //     //   // res.status(401).send({ error: "Something failed!" });

  //     res.status(400);
  //     throw new Error("invalid credentials");
  //   }
  // }
  // console.log(req.body.currentUserID);
  // console.log(req.query.id);
  console.log("req.query.id: ", req.query.id);
  const userrr = await User.findById(req.query.id);
  const cu = await User.findById(req.body.currentUserID);
  // console.log(userrr.status);
  console.log("cu: ", cu);
  if (userrr) {
    console.log("userrr: ", userrr);
    if (userrr.status === "active") {
      // console.log("authorized");
      // next();

      console.log("authorized");
      const users = await User.find({});
      res.status(200).json(users);
    } else {
      // }else {
      //   // console.log(error);
      //   // res.status(401).send({ error: "Something failed!" });
      res.status(401).send({ error: "Something failed!" });
      return new Error("invalid credentials");
    }
  }
  if (cu) {
    console.log("cu");
    if (cu.status === "active") {
      // console.log("authorized");
      // next();

      console.log("authorized");
      next();
    } else {
      // }else {
      //   // console.log(error);
      //   // res.status(401).send({ error: "Something failed!" });
      res.status(401).send({ error: "Something failed!" });
      return new Error("invalid credentials");
    }
  }
});
module.exports = {
  protect,
  ifBlocked,
  ifBlocked2,
};
