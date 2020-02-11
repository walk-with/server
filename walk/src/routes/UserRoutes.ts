import express, { Router } from 'express';
import { signup, login, edit, Info } from '../controllers/usercontollers';
const router: Router = express.Router();

router.get('/', Info);
router.post('/signup', signup);
router.post('/login', login);
router.patch('/edit', edit);


export default router;