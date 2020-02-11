import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import env from 'dotenv';
import jwt from "jsonwebtoken";
import { Users } from '../entity/Users';
import { Pets } from '../entity/Pets';

env.config();

export const PetCreate = async function (req: Request, res: Response) {
    const UserId = jwt.verify(req.headers.authorization, process.env.KEY).id;
    if (UserId) {
        const PetMaster = await getRepository(Users).findOne({
            where: {
                id: UserId
            }
        });
        // tslint:disable-next-line: await-promise
        const Pet = await getRepository(Pets).create({
            name: req.body.name,
            age: req.body.age,
            image: req.body.image,
            gender: req.body.gender,
            keyword: req.body.keyword,
            user: PetMaster
        });
        // tslint:disable-next-line: no-floating-promises
        getRepository(Pets).save(Pet).then(data => {
            if (data) {
                res.sendStatus(201);
            } else {
                res.sendStatus(400);
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

export const GetUserPets = async function (req: Request, res: Response) {
    const UserId = jwt.verify(req.headers.authorization, process.env.KEY).id;
    if (UserId) {
        const PetList = await getRepository(Pets).find({
            where: {
                user: UserId
            }
        });
        if (PetList.length > 0) {
            res.status(200);
            res.json(PetList);
        } else {
            res.status(200);
            res.json([]);
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