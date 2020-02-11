import express, { Router } from 'express';
import { signup, login, edit, Info } from '../controllers/usercontollers';
const router: Router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.patch('/edit', edit);
router.get('/', Info);



export default router;