import Joi from 'joi';

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

const register = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base':
      'Password must have at least one uppercase letter, one special character and one number'
  })
});

const requestEmailToken = Joi.object({
  email: Joi.string().email().required()
});

const verifyEmailToken = Joi.object({
  email: Joi.string().email().required(),
  emailVerificationToken: Joi.number().required()
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const resetPassword = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base':
      'Password must have at least one uppercase letter, one special character and one number'
  }),
  passwordResetToken: Joi.number().required()
});

const updatePassword = Joi.object({
  currentPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base':
      'Password must have at least one uppercase letter, one special character and one number'
  })
});

const removeSessions = Joi.object({
  sessionIds: Joi.array().items(Joi.string()).min(1).required()
});

export {
  register,
  requestEmailToken,
  verifyEmailToken,
  login,
  resetPassword,
  updatePassword,
  removeSessions
};
