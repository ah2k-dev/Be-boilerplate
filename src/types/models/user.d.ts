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
