import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  emailVerified: boolean;
  emailVerificationToken?: number;
  emailVerificationTokenExpires?: Date;
  passwordResetToken?: number;
  passwordResetTokenExpires?: Date;
  lastLogin?: Date;
  isActive: boolean;
  getJWTToken(): string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}
