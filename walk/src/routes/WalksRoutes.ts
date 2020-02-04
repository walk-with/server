import express, { Router } from 'express';
import { list, detail, create } from '../controllers/walkscontrollers';
const router: Router = express.Router();

router.get('/list', list);
router.get('/detail', detail);
router.post('/create', create);


export default router; 