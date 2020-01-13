import express, { Router } from 'express';
import { list, detail } from '../controllers/walkscontrollers';
const router: Router = express.Router();

router.get('/list', list);
router.get('/detail', detail);


export default router;