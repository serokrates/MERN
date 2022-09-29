const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getAllRegisteredUsers,
  blockUser,
  deleteUser,
} = require("../controlers/userControler");

const {
  protect,
  ifBlocked,
  ifBlocked2,
} = require("../middleware/authMiddleware");

router.route("/").get(ifBlocked2, getAllRegisteredUsers).post(registerUser);
router.post("/login", loginUser);
router.route("/me").get(protect, ifBlocked, getMe);
router
  .route("/me/:id")
  .put(protect, ifBlocked2, blockUser)
  .delete(protect, ifBlocked2, deleteUser);

module.exports = router;
