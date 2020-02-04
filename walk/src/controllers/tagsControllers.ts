import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import env from 'dotenv';
import { Tags } from '../entity/Tags';


export const GetTags = async (req: Request, res: Response) => {
    const TagList = await getRepository(Tags).find();
    res.status(200);
    res.json(TagList);
};