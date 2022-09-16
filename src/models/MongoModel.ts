import { Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(body: T) : Promise<T> {
    const data = await this._model.create(body);
    return data as T & { _id: string };
  }

  public async read() : Promise<T[]> {
    return this._model.find();
  }

  public async readOne(_id:string) : Promise<T | null> {
    return this._model.findOne({ _id });
  }

  public async update(_id: string, obj: Partial<T>) : 
  Promise<T & { _id: string } | null> {
    const updated = await this._model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );

    if (!updated) return null;

    return updated as T & { _id: string };
  }

  public async delete(_id: string) : Promise<T | null> {
    const deleted = await this._model.deleteOne({ _id });
    if (!deleted) throw new Error();
    return deleted as unknown as T & { _id: string }; 
  }
}

export default MongoModel;
