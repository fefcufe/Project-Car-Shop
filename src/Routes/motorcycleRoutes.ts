import { Request, Response, Router } from 'express';
import MotorcycleModel from '../models/motorcycles';
import MotorcycleService from '../services/motorcycle';
import MotorcycleController from '../controllers/motorcycle';

const router = Router();

const motorcycleModel = new MotorcycleModel(); 
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

router.post('/', (req: Request, res: Response) => motorcycleController.create(req, res));
router.get('/', (_req: Request, res: Response) => motorcycleController.read(_req, res));
router.get('/:id', (req: Request, res: Response) => motorcycleController.readOne(req, res));
router.put('/:id', (req: Request, res: Response) => motorcycleController.update(req, res));
router.delete('/:id', (req: Request, res: Response) => motorcycleController.delete(req, res));

export default router;