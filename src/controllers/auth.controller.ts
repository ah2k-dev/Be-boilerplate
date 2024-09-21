import User from '../models/User/user.model';
import { IUser } from '../types/models/user';
import sendMail from '../utils/sendMail';
import SuccessHandler from '../utils/successHandler';
import ErrorHandler from '../utils/errorHandler';
import { RequestHandler } from 'express';
import * as authTypes from '../types/controllers/auth';
//register
const register: RequestHandler = async (req, res) => {
  // #swagger.tags = ['auth']
  try {
    const { name, email, password } = req.body as authTypes.RegisterBody;
    const user: IUser | null = await User.findOne({ email });
    if (user) {
      return ErrorHandler({
        message: 'User already exists',
        statusCode: 400,
        req,
        res
      });
    }
    const newUser: IUser | null = await User.create({
      name,
      email,
      password
    });
    newUser.save();
    return SuccessHandler({
      data: newUser,
      statusCode: 201,
      res
    });
  } catch (error) {
    return ErrorHandler({
      message: (error as Error).message,
      statusCode: 500,
      req,
      res
    });
  }
};

//request email verification token
const requestEmailToken: RequestHandler = async (req, res) => {
  // #swagger.tags = ['auth']

  try {
    const { email } = req.body as authTypes.RequestEmailTokenBody;
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return ErrorHandler({
        message: 'User does not exist',
        statusCode: 400,
        req,
        res
      });
    }
    const emailVerificationToken: number = Math.floor(
      100000 + Math.random() * 900000
    );
    const emailVerificationTokenExpires: Date = new Date(
      Date.now() + 10 * 60 * 1000
    );
    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationTokenExpires = emailVerificationTokenExpires;
    await user.save();
    const message: string = `Your email verification token is ${emailVerificationToken} and it expires in 10 minutes`;
    const subject: string = `Email verification token`;
    await sendMail({
      email,
      subject,
      text: message
    });
    return SuccessHandler({
      data: `Email verification token sent to ${email}`,
      statusCode: 200,
      res
    });
  } catch (error) {
    return ErrorHandler({
      message: (error as Error).message,
      statusCode: 500,
      req,
      res
    });
  }
};

//verify email token
const verifyEmail: RequestHandler = async (req, res) => {
  // #swagger.tags = ['auth']

  try {
    const { email, emailVerificationToken } =
      req.body as authTypes.VerifyEmailTokenBody;
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User does not exist'
      });
    }
    if (
      user.emailVerificationToken !== emailVerificationToken ||
      !user.emailVerificationTokenExpires || // Check if it exists
      user.emailVerificationTokenExpires.getTime() < Date.now() // Compare timestamps
    ) {
      return ErrorHandler({
        message: 'Invalid token',
        statusCode: 400,
        req,
        res
      });
    }
    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationTokenExpires = null;
    const jwtToken: string = user.getJWTToken();
    await user.save();
    return SuccessHandler({
      data: {
        token: jwtToken,
        user
      },
      statusCode: 200,
      res
    });
  } catch (error) {
    return ErrorHandler({
      message: (error as Error).message,
      statusCode: 500,
      req,
      res
    });
  }
};

//login
const login: RequestHandler = async (req, res) => {
  // #swagger.tags = ['auth']
  try {
    const { email, password } = req.body as authTypes.LoginBody;
    const user: IUser | null = await User.findOne({ email }).select(
      '+password'
    );
    if (!user) {
      return ErrorHandler({
        message: 'Invalid credentials',
        statusCode: 400,
        req,
        res
      });
    }
    const isMatch: boolean = await user.comparePassword(password);
    if (!isMatch) {
      return ErrorHandler({
        message: 'Invalid credentials',
        statusCode: 400,
        req,
        res
      });
    }
    if (!user.emailVerified) {
      return ErrorHandler({
        message: 'Email not verified',
        statusCode: 400,
        req,
        res
      });
    }
    const jwtToken: string = user.getJWTToken();
    return SuccessHandler({
      data: {
        token: jwtToken,
        user
      },
      statusCode: 200,
      res
    });
  } catch (error) {
    return ErrorHandler({
      message: (error as Error).message,
      statusCode: 500,
      req,
      res
    });
  }
};

//logout
const logout: RequestHandler = async (req, res) => {
  // #swagger.tags = ['auth']

  try {
    req.user = null;
    return SuccessHandler({
      data: 'Logged out successfully',
      statusCode: 200,
      res
    });
  } catch (error) {
    return ErrorHandler({
      message: (error as Error).message,
      statusCode: 500,
      req,
      res
    });
  }
};

//forgot password
const forgotPassword: RequestHandler = async (req, res) => {
  // #swagger.tags = ['auth']

  try {
    const { email } = req.body as authTypes.RequestEmailTokenBody;
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return ErrorHandler({
        message: 'User does not exist',
        statusCode: 400,
        req,
        res
      });
    }
    const passwordResetToken: number = Math.floor(
      100000 + Math.random() * 900000
    );
    const passwordResetTokenExpires: Date = new Date(
      Date.now() + 10 * 60 * 1000
    );
    user.passwordResetToken = passwordResetToken;
    user.passwordResetTokenExpires = passwordResetTokenExpires;
    await user.save();
    const message: string = `Your password reset token is ${passwordResetToken} and it expires in 10 minutes`;
    const subject: string = `Password reset token`;
    await sendMail({ email, subject, text: message });
    return SuccessHandler({
      data: `Password reset token sent to ${email}`,
      statusCode: 200,
      res
    });
  } catch (error) {
    return ErrorHandler({
      message: (error as Error).message,
      statusCode: 500,
      req,
      res
    });
  }
};

//reset password
const resetPassword: RequestHandler = async (req, res) => {
  // #swagger.tags = ['auth']

  try {
    const { email, passwordResetToken, password } =
      req.body as authTypes.ResetPasswordBody;
    const user: IUser | null = await User.findOne({ email }).select(
      '+password'
    );
    if (!user) {
      return ErrorHandler({
        message: 'User does not exist',
        statusCode: 400,
        req,
        res
      });
    }
    if (
      user.passwordResetToken !== passwordResetToken ||
      !user.passwordResetTokenExpires || // Check if it exists
      user.passwordResetTokenExpires?.getTime() < Date.now()
    ) {
      return ErrorHandler({
        message: 'Invalid token',
        statusCode: 400,
        req,
        res
      });
    }
    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetTokenExpires = null;
    await user.save();
    return SuccessHandler({
      data: 'Password reset successfully',
      statusCode: 200,
      res
    });
  } catch (error) {
    return ErrorHandler({
      message: (error as Error).message,
      statusCode: 500,
      req,
      res
    });
  }
};

//update password
const updatePassword: RequestHandler = async (req, res) => {
  // #swagger.tags = ['auth']

  try {
    const { currentPassword, newPassword } =
      req.body as authTypes.UpdaatePasswordBody;

    const user: IUser | null = await User.findById(req.user?._id).select(
      '+password'
    );
    if (!user) {
      return ErrorHandler({
        message: 'User does not exist',
        statusCode: 400,
        req,
        res
      });
    }
    const isMatch = await user?.comparePassword(currentPassword);
    if (!isMatch) {
      return ErrorHandler({
        message: 'Invalid credentials',
        statusCode: 400,
        req,
        res
      });
    }
    const samePasswords = await user?.comparePassword(newPassword);
    if (samePasswords) {
      return ErrorHandler({
        message: 'New password cannot be the same as the current password',
        statusCode: 400,
        req,
        res
      });
    }
    user.password = newPassword;
    await user.save();
    return SuccessHandler({
      data: 'Password updated successfully',
      statusCode: 200,
      res
    });
  } catch (error) {
    return ErrorHandler({
      message: (error as Error).message,
      statusCode: 500,
      req,
      res
    });
  }
};

export {
  register,
  requestEmailToken,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword
};
