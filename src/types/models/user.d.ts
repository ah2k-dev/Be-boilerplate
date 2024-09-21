import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  emailVerified: boolean;
  emailVerificationToken?: number | null;
  emailVerificationTokenExpires?: Date | null;
  passwordResetToken?: number | null;
  passwordResetTokenExpires?: Date | null;
  lastLogin?: Date;
  isActive: boolean;
  getJWTToken(): string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}
