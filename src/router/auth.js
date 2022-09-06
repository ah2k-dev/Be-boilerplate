const express = require("express");
const auth = require("../controllers/authController");
const isAuthenticated = require("../middleware/auth");
const router = express.Router();

//get
router.route("/logout").get(auth.logout);
//post
router.route("/register").post(auth.register);
router.route("/login").post(auth.login);
router.route("/requestEmailToken").post(auth.requestEmailToken);
router.route("/verifyEmail").post(auth.verifyEmail);
router.route("/forgotPassword").post(auth.forgotPassword);
//put
router.route("/resetPassword").put(auth.resetPassword);
router.route("/updatePassword").put(isAuthenticated, auth.updatePassword);

module.exports = router;
