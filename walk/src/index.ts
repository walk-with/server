import "reflect-metadata";
import bodyParser from 'body-parser';
import express, { Express } from 'express';
import morgan from 'morgan';
import env from 'dotenv';
import cors from 'cors';
import socketIo from 'socket.io';
import petsRoutes from './routes/PetsRoutes';
import { lazy } from './lazy';
import chatRoutes from './routes/chatsRoutes';
import tagsRoutes from './routes/TagsRoutes';
import { createConnection } from "typeorm";
import userRoutes from './routes/UserRoutes';
import walkRoutes from './routes/WalksRoutes';
import { NextFunction } from "connect";

env.config();
createConnection().then(async connection => {
    const app: Express = express();
    const io = socketIo.listen(app.listen(4000));
    app.use(cors({ credentials: true }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    // await lazy(connection);// 얘는 db에 fakeData넣는 법
    app.use('/users', userRoutes);
    app.use('/walks', walkRoutes);
    app.use('/tags', tagsRoutes);
    app.use('/pets', petsRoutes);

    io.sockets.on('connection', function (socket) {
        console.log("연결 성공");
        return SaveMessge(socket, io);
    });
    // tslint:disable-next-line:no-unused-expression
    app.use('/chat', chatRoutes);
    // 하루에 한번 실행되는 함수 => 안에는 오늘 날짜를 기준으로 일주일 된 walks 테이블 지우는 함수
}).catch(err => {
    throw new Error(err);
});