import { IService } from '../interfaces/IService';
import { ICar, carZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/errorsCatalog';

export default class CarService implements IService<ICar> {
  constructor(private _car: IModel<ICar>) {}

  public async create(obj: unknown) : Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    return this._car.create(parsed.data);
  }

  public async read() : Promise<ICar[]> {
    const cars = await this._car.read();
    return cars;
  }

  public async readOne(_id: string): Promise<ICar | null> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.ObjectNotFound);
    return car;
  }

  public async update(_id: string, obj: ICar) : Promise<ICar | null> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);

    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    const updated = await this._car.update(_id, obj);

    if (!updated) throw new Error(ErrorTypes.ObjectNotFound);
    
    return updated as ICar;
  }

  public async delete(_id: string) : Promise<ICar> {
    const deleted = await this._car.delete(_id);

    return deleted as ICar;
  }
}