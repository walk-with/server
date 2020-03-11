import express, { Router } from 'express';
// tslint:disable-next-line: no-duplicate-imports
import { CreatePet, GetUserPet, DeletePet } from '../controllers/petsControllers';
const router: Router = express.Router();

router.get('/', GetUserPet);
router.delete('/delete', DeletePet);
router.post('/create', CreatePet);


export default router;

