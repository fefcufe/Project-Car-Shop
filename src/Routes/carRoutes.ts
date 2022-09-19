import { Request, Response, Router } from 'express';

const router = Router();

router.post('/', (_req: Request, res: Response) => 
  res.status(200).json({ message: 'Rota /cars POST criada com sucesso' }));

export default router;