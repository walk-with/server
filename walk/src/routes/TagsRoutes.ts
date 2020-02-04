import express, { Router } from 'express';
import { GetTags } from '../controllers/tagsControllers';
const router: Router = express.Router();

router.get("/", GetTags);

export default router;