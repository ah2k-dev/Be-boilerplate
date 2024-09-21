interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface RequestEmailTokenBody {
  email: string;
}

interface VerifyEmailTokenBody {
  email: string;
  emailVerificationToken: number;
}

interface LoginBody {
  email: string;
  password: string;
}

interface ResetPasswordBody {
  email: string;
  password: string;
  passwordResetToken: number;
}

interface UpdaatePasswordBody {
  currentPassword: string;
  newPassword: string;
}

export {
  RegisterBody,
  RequestEmailTokenBody,
  VerifyEmailTokenBody,
  LoginBody,
  ResetPasswordBody,
  UpdaatePasswordBody
};
