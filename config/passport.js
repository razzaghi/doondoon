import passport from 'passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'

import UserModel from '../models/user'

/** JWT strategy for authorize to protect routes  */
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: 'aslsdjfoweoivlskjdfjijewfwef'
};

const jwtLogin = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await UserModel.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});



/** Apply all login strategy */
// passport.use(localLogin);
passport.use(jwtLogin);

// export const authLocal = passport.authenticate("local", { session: false });
export default passport;
