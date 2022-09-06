const User = require("../models/User/user");
const sendMail = require("../utils/sendMail");

//register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      !password.match(
        /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain atleast one uppercase letter, one special character and one number",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });
    newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//request email verification token
const requestEmailToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    const emailVerificationToken = Math.floor(100000 + Math.random() * 900000);
    const emailVerificationTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationTokenExpires = emailVerificationTokenExpires;
    await user.save();
    const message = `Your email verification token is ${emailVerificationToken} and it expires in 10 minutes`;
    const subject = `Email verification token`;
    await sendMail(email, subject, message);
    res.status(200).json({
      success: true,
      message: "Email verification token sent",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//verify email token
const verifyEmail = async (req, res) => {
  try {
    const { email, emailVerificationToken } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    if (
      user.emailVerificationToken !== emailVerificationToken ||
      user.emailVerificationTokenExpires < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid email verification token",
      });
    }
    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationTokenExpires = null;
    jwtToken = user.getJWTToken();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      token: jwtToken,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    jwtToken = user.getJWTToken();
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: jwtToken,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//logout
const logout = async (req, res) => {
  try {
    req.user = null;
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    const passwordResetToken = Math.floor(100000 + Math.random() * 900000);
    const passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.passwordResetToken = passwordResetToken;
    user.passwordResetTokenExpires = passwordResetTokenExpires;
    await user.save();
    const message = `Your password reset token is ${resetPasswordToken} and it expires in 10 minutes`;
    const subject = `Password reset token`;
    await sendMail(email, subject, message);
    res.status(200).json({
      success: true,
      message: `Password reset token sent to ${email}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//reset password
const resetPassword = async (req, res) => {
  try {
    const { email, passwordResetToken, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    if (
      user.passwordResetToken !== passwordResetToken ||
      user.passwordResetTokenExpires < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid password reset token",
      });
    }
    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetTokenExpires = null;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//update password
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (
      !newPassword.match(
        /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain atleast one uppercase letter, one special character and one number",
      });
    }
    const user = await User.findById(req.user.id).select("+password");
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const samePasswords = await user.comparePassword(newPassword);
    if (samePasswords) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be same as old password",
      });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  requestEmailToken,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
};
