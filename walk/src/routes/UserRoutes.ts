import express, { Router } from 'express';
import { Signup, Login, Edit, Info, Delete } from '../controllers/usercontollers';
const router: Router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.patch('/edit', Edit);
router.delete('/delete', Delete);
router.get('/', Info);



export default router;