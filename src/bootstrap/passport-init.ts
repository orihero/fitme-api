import passport from "passport";
import { Strategy } from "passport-jwt";
import { UserService } from "../services";
import JWTConfig from "../config/jwt";

passport.serializeUser((user: Express.User, done) => done(null, user));

passport.deserializeUser((user: Express.User, done) => done(null, user));

const init = () => {
  passport.use(
    new Strategy(JWTConfig.Options, (payload, done) => {
      UserService.find({ _id: payload.sub })
        .then((user) => (user ? done(null, user) : done(null, false)))
        .catch((error) => done(error, false));
    })
  );
};

export default init;
