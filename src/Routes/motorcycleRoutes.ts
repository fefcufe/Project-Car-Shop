import { Request, Response, Router } from 'express';
import MotorcycleModel from '../models/motorcycles';
import MotorcycleService from '../services/motorcycle';
import MotorcycleController from '../controllers/motorcycle';

const router = Router();

const motorcycleModel = new MotorcycleModel(); 
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

router.post('/', (req: Request, res: Response) => motorcycleController.create(req, res));

export default router;