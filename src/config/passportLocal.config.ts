import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User/user.model';
import { IUser } from '../types/models/user';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user: IUser | null = await User.findOne({ email })
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        const isMatch: boolean = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user:any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user: IUser|null = await User.findById(id).exec();
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;