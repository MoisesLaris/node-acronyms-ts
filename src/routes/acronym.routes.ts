import { Router } from 'express';
import { getAcronym, postAcronym, updateAcronym, deleteAcronym, getAcronymById, getRandomAcronyms, getInfo } from './../controllers/acronym.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
router.get('/', getAcronym);
router.post('/', postAcronym);
router.put('/:acronym', authenticate, updateAcronym);
router.delete('/:acronym', authenticate, deleteAcronym);

// Extra endpoints
router.get('/random', getRandomAcronyms);
router.get('/info', getInfo);
router.get('/:id', getAcronymById);

export default router;