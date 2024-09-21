import express, { Router } from 'express';
import auth from './auth.routes';
const router: Router = express.Router();

router.use('/auth', auth);

export default router;
