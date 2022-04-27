import { Router } from 'express';
import { getAcronym, postAcronym, updateAcronym, deleteAcronym, getAcronymById, getRandomAcronyms, getInfo } from './../controllers/acronym.controller';

const router = Router();
router.get('/', getAcronym);
router.post('/', postAcronym);
router.put('/:acronym', updateAcronym);
router.delete('/:acronym', deleteAcronym);

// Extra endpoints
router.get('/random', getRandomAcronyms);
router.get('/info', getInfo);
router.get('/:id', getAcronymById);

export default router;