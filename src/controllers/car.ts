import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) {}

  public async create(
    req: Request, 
    res: Response<ICar>,
  ) {
    const { model, year, color, buyValue, seatsQty, doorsQty } = req.body;
    const car = { model, year, color, buyValue, seatsQty, doorsQty };
    const results = await this._service.create(car);
    return res.status(201).json(results);
  }

  public async read(res: Response) {
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
    const { model, year, color, buyValue, seatsQty, doorsQty } = req.body;
    const car = { model, year, color, buyValue, seatsQty, doorsQty };
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