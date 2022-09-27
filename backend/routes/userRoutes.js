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

// bringing protect function from aur middleware
const { protect, ifBlocked } = require("../middleware/authMiddleware");
// to są endpointy
// router.post('/', registerUser)
router.route("/").get(getAllRegisteredUsers).post(registerUser);
router.post("/login", loginUser);
router.route("/me").get(protect, ifBlocked, getMe);
router.route("/me/:id").put(protect, blockUser).delete(protect, deleteUser);
// router.route("/me/:id").put(protect, blockUser).delete(protect, deleteUser);

// .delete(deleteUsers)

// router.route('/').post(registerUser)
// router.route('/register').get(getGoals).post(setGoals)
// // router.get('/', getGoals)
// // router.get('/', setGoals)

// router.route('/:id').put(updateGoals).delete(deleteGoals)
// // router.get('/:id', updateGoals)
// // router.get('/:id', deleteGoals)

module.exports = router;
