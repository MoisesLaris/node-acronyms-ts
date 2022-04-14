import { Router, Response, Request } from 'express';

const router = Router();
// const lawController = new LawController();
router.get('/', (req: Request, res: Response) => {
    res.status(200).send('thanks a lot');
});


export default router;