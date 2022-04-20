import { Router } from 'express';
import { getAcronym } from './../controllers/acronym.controller';

const router = Router();
router.get('/', getAcronym);
router.post('/')

// Other routes return 404 status
router.get("*", (req, res) => {
  res.sendStatus(404);
});

export default router;