import { Request, Response } from 'express';
import crypto from 'crypto';
import { getRepository } from "typeorm";
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import { Users } from '../entity/Users';
env.config();

export const Signup = async function (req: Request, res: Response) {
    let { email, password, name } = req.body;
    const checkuser = await getRepository(Users).find({
        email: email
    });
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

export const Login = function (req: Request, res: Response) {
    console.log("들어가니 로그인 라우터");
    let { email, password } = req.body;
    return getRepository(Users).findOne({ where: { email } })
        .then(user => {
            const checkPassword = crypto.createHmac('sha256', process.env.SALT).update(password).digest('hex');
            if (user === undefined) {
                res.status(401);
                res.json({
                    error: {
                        status: 401,
                        type: "LoginFailed",
                        message: "입력하신 이메일에 일치하는 유저가 없습니다."
                    }
                });
            }
            if (user.password === checkPassword) {
                res.status(200);
                jwt.sign({ id: user.id }, process.env.KEY, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        token: token
                    });
                });
            } else {
                res.status(401);
                res.json({
                    error: {
                        status: 401,
                        type: "LoginFailed",
                        message: "입력하신 비밀번호가 일치하지 않습니다."
                    }
                });
            }
        });
};

export const Edit = async function (req: Request, res: Response) {
    // jwt주면 그거를 풀어서 아이디를 알아내자
    const userId = jwt.verify(req.headers.authorization, process.env.KEY);
    console.log("userId", userId);
    if (userId) {
        let { email, password, name } = req.body;
        password = crypto.createHmac('sha256', process.env.SALT).update(password).digest('hex');
        const ChangeUser = await getRepository(Users).update(userId, {
            email, password, name
        });
        res.status(200);
        res.json({ message: "성공적으로 수정되었습니다." });
    }
    else {
        res.status(403);
        res.json({
            error: {
                status: 403,
                type: "ExpiredToken",
                message: "만료된 토큰입니다. 비밀번호 재설정 요청을 다시 해주세요."
            }
        });
    }
};

export const Info = function (req: Request, res: Response) {
    const UserId = jwt.verify(req.headers.authorization, process.env.KEY).id;
    console.log("userId", UserId);
    if (UserId) {
        // tslint:disable-next-line: no-floating-promises
        getRepository(Users).findOne({
            where: {
                id: UserId
            }

        }).then(data => {
            if (data) {
                res.status(200);
                res.json(data);
            } else {
                res.status(404);
                res.json({
                    error: {
                        status: 404,
                        type: "EmailNotFound",
                        message: "입력하신 이메일로 가입되어 있는 일반 계정이 없습니다."
                    }
                });
            }
        });
    } else {
        res.status(403);
        res.json({
            error: {
                status: 403,
                type: "ExpiredToken",
                message: "만료된 토큰입니다. 비밀번호 재설정 요청을 다시 해주세요."
            }
        });
    }
};

export const Delete = async function (req: Request, res: Response) {
    const userId: number = jwt.verify(req.headers.authorization, process.env.KEY).id;
    if (userId) {
        const userInfo = await getRepository(Users).delete(userId);
        if (userInfo) {
            res.sendStatus(204);
        } else {
            res.status(404);
            res.json({
                error: {
                    status: 404,
                    type: "EmailNotFound",
                    message: "입력하신 이메일로 가입되어 있는 일반 계정이 없습니다."
                }
            });
        }
    } else {
        res.status(403);
        res.json({
            error: {
                status: 403,
                type: "ExpiredToken",
                message: "만료된 토큰입니다. 비밀번호 재설정 요청을 다시 해주세요."
            }
        });
    }
};