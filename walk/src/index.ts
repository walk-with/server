import "reflect-metadata";
import bodyParser from 'body-parser';
import express, { response } from 'express';
import margan from 'morgan';
import { createConnection } from "typeorm";
import userRoutes from './routes/UserRoutes';

createConnection().then(async connection => {
    const app = express();

    app.use(bodyParser.json());
    app.use(margan('short'));

    app.use('/users', userRoutes);
    app.listen('4000', () => {
        console.log("서버 작동 중");
    });
}).catch(err => {
    response.status(500);
    response.json({ err: '서버에러' });
    throw new Error(err);
});