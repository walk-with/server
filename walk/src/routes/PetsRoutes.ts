import express, { Router } from 'express';
// tslint:disable-next-line: no-duplicate-imports
import { PetCreate, GetUserPets } from '../controllers/petsControllers';
const router: Router = express.Router();

router.get('/', GetUserPets);
router.post('/create', PetCreate);


export default router;

