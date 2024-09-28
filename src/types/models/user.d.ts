import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  emailVerificationToken?: number | null;
  emailVerificationTokenExpires?: Date | null;
  passwordResetToken?: number | null;
  passwordResetTokenExpires?: Date | null;
  isActive: boolean;
  getJWTToken(): string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

export interface UserSession extends Document {
  _id: string;
  expires: Date;
  session: {
    cookie: {
      originalMaxAge: number | null;
      partitioned: boolean | null;
      priority: string | null;
      expires: Date | null;
      secure: boolean | null;
      httpOnly: boolean;
      domain: string | null;
      path: string;
      sameSite: string | null;
    };
    passport: {
      user: string;
    };
    deviceInfo: {
      browser: string;
      version: string;
      os: string;
    };
    lastActive: Date;
  };
}
