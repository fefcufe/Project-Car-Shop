import { IService } from '../interfaces/IService';
import { IMotorcycle, motorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/errorsCatalog';

export default class MotorcycleService implements IService<IMotorcycle> {
  constructor(private _motorcycle: IModel<IMotorcycle>) {}

  public async create(obj: unknown) : Promise<IMotorcycle> {
    const parsed = motorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    return this._motorcycle.create(parsed.data);
  }

  public async read() : Promise<IMotorcycle[]> {
    const motorcycles = await this._motorcycle.read();
    if (!motorcycles) throw new Error(ErrorTypes.ObjectNotFound);
    return motorcycles;
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    const motorcycle = await this._motorcycle.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.ObjectNotFound);
    return motorcycle;
  }

  public async update(_id: string, obj: IMotorcycle) : Promise<IMotorcycle | null> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);

    const parsed = motorcycleZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    const updated = await this._motorcycle.update(_id, obj);

    if (!updated) throw new Error(ErrorTypes.ObjectNotFound);
    
    return updated as IMotorcycle;
  }

  public async delete(_id: string) : Promise<IMotorcycle> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);

    const deleted = await this._motorcycle.delete(_id);

    if (!deleted) throw new Error(ErrorTypes.ObjectNotFound);
    
    return deleted as IMotorcycle;
  }
}