import { IService } from '../interfaces/IService';
import { ICar, carZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

/* create(obj: T) : Promise<T>
  read() : Promise<T[]>
  readOne(_id: string): Promise<T | null>
  update(_id: string, obj: T) : Promise<T | null>
  delete(_id: string) : Promise<T | null>
} */

export default class CarService implements IService<ICar> {
  constructor(private _car: IModel<ICar>) {}

  public async create(obj: ICar) : Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const created = await this._car.create(parsed.data);

    return created;
  }

  public async read() : Promise<ICar[]> {
    const cars = await this._car.read();
    return cars;
  }

  public async readOne(_id: string): Promise<ICar | null> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error();
    return car;
  }

  public async update(_id: string, obj: ICar) : Promise<ICar | null> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    const updated = await this._car.update(_id, obj);
    
    return updated as ICar;
  }

  public async delete(_id: string) : Promise<ICar> {
    const deleted = await this._car.delete(_id);

    return deleted as ICar;
  }
}