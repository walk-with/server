import { Request, Response, response } from 'express';
import crypto from 'crypto';
import { getRepository } from "typeorm";
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import { Users } from '../entity/Users';
env.config();

export const signup = async function (req: Request, res: Response) {
    let { email, password, name } = req.body;
    console.log('SALT', process.env.SALT);
    const checkuser = await getRepository(Users).find({
        email: email
    });
    console.log("check", checkuser.length);
    if (checkuser.length === 0) {
        password = crypto.createHmac('sha256', process.env.SALT).update(password).digest('hex');
        // tslint:disable-next-line: await-promise
        const user = await getRepository(Users).create({ email, password, name });
        // tslint:disable-next-line: no-floating-promises
        getRepository(Users).save(user).then(() => {
            res.status(201);
            res.json({ message: '성공적으로 가입되었습니다.' });
        });
    }
    else {
        res.status(409);
        res.json({
            error: {
                status: 409,
                type: "DuplicateEmail",
                message: "이미 사용중인 이메일 주소입니다."
            }
        });
    }
};



// export const login = function (req: Request, res: Response) { };
// export const edit = function (req: Request, res: Response) { };