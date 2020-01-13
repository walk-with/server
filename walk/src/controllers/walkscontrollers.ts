import { Request, Response, response } from 'express';
import crypto from 'crypto';
import { getRepository } from "typeorm";
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import { Walks } from '../entity/Walks';
env.config();

export const list = async function (req: Request, res: Response) { };
export const detail = async function (req: Request, res: Response) { };  
