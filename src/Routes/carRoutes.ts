import { Request, Response, Router } from 'express';
import CarModel from '../models/cars';
import CarService from '../services/car';
import CarController from '../controllers/car';

const router = Router();

const carModel = new CarModel(); 
const carService = new CarService(carModel);
const carController = new CarController(carService);

router.post('/', (req: Request, res: Response) => carController.create(req, res));
router.get('/', (_req: Request, res: Response) => carController.read(res));
router.get('/:id', (req: Request, res: Response) => carController.readOne(req, res));
router.put('/:id', (req: Request, res: Response) => carController.update(req, res));
export default router;