import express, { Router } from 'express';
import { PetCreate, GetUserPets } from '../controllers/petsControllers';
const router: Router = express.Router();

router.get('/', GetUserPets);
router.post('/create', PetCreate);


export default router;