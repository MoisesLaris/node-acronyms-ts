import { Router } from 'express';
import { getAcronym } from './../controllers/acronym.controller';

const router = Router();
router.get('/', getAcronym);
router.post('/')

export default router;