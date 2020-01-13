import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import { Users } from './entity/Users';
import { getRepository } from "typeorm";
import crypto from 'crypto';
import env from 'dotenv';


const JWTStrategy = passportJWT.Strategy;
const JWTExtract = passportJWT.ExtractJWT;
const LocalStrategy = passportLocal.Strategy;

env.config();

// tslint:disable-next-line:no-unused-expression
export default () => {
    console.log("여기는?");
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        console.log("LocalStrategy", email, password);
        password = crypto.createHmac('sha256', process.env.SALT).update(password).digest('hex');
        return getRepository(Users).findOne({ where: { email, password } })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'email 또는 password가 맞지 않습니다.' });
                }
                return done(null, user, { message: '로그인에 성공하였습니다.' });
            })
            .catch(err => done(err));
    })
    );
    passport.use(new JWTStrategy({
        jwtFromRequest: JWTExtract.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.KEY
    }), function (jwtPayload, done) {
        console.log("어때?");
        console.log("jwtPayload", jwtPayload);
        return getRepository(Users).findOne(jwtPayload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
            });
    });
};

