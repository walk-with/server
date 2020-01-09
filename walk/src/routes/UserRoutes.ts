import express, { Router } from 'express';
import { signup } from '../controllers/usercontollers';
const router: Router = express.Router();

router.post('/signup', signup);
// router.post('/login', login);
// router.patch('/edit', edit);


export default router;