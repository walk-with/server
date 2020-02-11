import "reflect-metadata";
import bodyParser from 'body-parser';
import express from 'express';
import margan from 'morgan';
import env from 'dotenv';
import cors from 'cors';
import { lazy } from './lazy';
import petRoutes from './routes/PetsRoutes';
import tagsRoutes from './routes/TagsRoutes';
import { createConnection } from "typeorm";
import userRoutes from './routes/UserRoutes';
import walkRoutes from './routes/WalksRoutes';

env.config();
createConnection().then(async connection => {
    const app = express();
    app.use(cors({ credentials: true }));
    app.use(bodyParser.json());
    app.use(margan('dev'));
    // await lazy(connection);// 얘는 db에 fakeData넣는 법
    app.use('/users', userRoutes);
    app.use('/walks', walkRoutes);
    app.use('/tags', tagsRoutes);
    app.use('/pets', petRoutes);
    // app.use('/chats');
    app.listen('4000', () => {
        console.log("4000 서버 작동 중");
    });
}).catch(err => {
    throw new Error(err);
});