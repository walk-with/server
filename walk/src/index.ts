import "reflect-metadata";
import bodyParser from 'body-parser';
import express, { response } from 'express';
import margan from 'morgan';
import env from 'dotenv';
import cors from 'cors';
import { createConnection } from "typeorm";
import userRoutes from './routes/UserRoutes';
import walkRoutes from './routes/WalksRoutes';
import passport from 'passport';
import passportConfig from './passportJWT';
env.config();
createConnection().then(async connection => {
    const app = express();
    app.use(cors({ credentials: true }));
    app.use(bodyParser.json());
    // app.set('jwt-secret', process.env.KEY);
    app.use(margan('short'));
    // app.use(passport.initialize());
    // passportConfig();
    app.use('/users', userRoutes);
    app.use('/walks', walkRoutes);
    app.listen('4000', () => {
        console.log("서버 작동 중");
    });
}).catch(err => {
    throw new Error(err);
});