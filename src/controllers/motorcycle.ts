import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) {}
  
  public async create(
    req: Request, 
    res: Response<IMotorcycle>,
  ) {
    const { model, year, color, buyValue, category, engineCapacity } = req.body;
    const motorcycle = { model, year, color, buyValue, category, engineCapacity };
    const result = await this._service.create(motorcycle);
    return res.status(201).json(result);
  }

  public async read(_req: Request, res: Response) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async readOne(
    req: Request, 
    res: Response,
  ) {
    const { id } = req.params;
    const results = await this._service.readOne(id);
    return res.status(200).json(results); 
  }

  public async update(
    req: Request, 
    res: Response,
  ) {
    const { id } = req.params;
    const { model, year, color, buyValue, category, engineCapacity } = req.body;
    const car = { model, year, color, buyValue, category, engineCapacity };
    const results = await this._service.update(id, car);
    return res.status(200).json(results);
  }

  public async delete(
    req: Request, 
    res: Response,
  ) {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(204).end();
  }
}