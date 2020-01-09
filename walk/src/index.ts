import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express';
import margan from 'morgan';

const app = express();

// import { Request, Response } from 'express';


app.use(margan);

app.listen('4000', () => {
    console.log("음...");
});

