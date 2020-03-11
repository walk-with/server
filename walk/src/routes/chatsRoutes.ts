import express, { Router } from 'express';
// tslint:disable-next-line: no-duplicate-imports
import { takeChats } from "../controllers/chatsControllers";
const router: Router = express.Router();

router.get('/', takeChats);

export default router;