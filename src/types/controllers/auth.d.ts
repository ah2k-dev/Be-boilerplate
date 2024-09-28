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

interface UpdatePasswordBody {
  currentPassword: string;
  newPassword: string;
}

interface RemoveSessionsBody {
  sessionIds: string[];
}

export {
  RegisterBody,
  RequestEmailTokenBody,
  VerifyEmailTokenBody,
  LoginBody,
  ResetPasswordBody,
  UpdatePasswordBody,
  RemoveSessionsBody
};
