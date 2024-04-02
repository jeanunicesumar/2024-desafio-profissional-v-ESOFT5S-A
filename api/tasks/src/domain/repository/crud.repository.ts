import { Document, Model, UpdateQuery } from "mongoose";
import { ICrudRepository } from "../interfaces/crud.repository";

export class CrudRepository<Entity extends Document> implements ICrudRepository<Entity> {

    protected readonly model: Model<Entity>;

    constructor(model: Model<Entity>) {
        this.model = model;
    }

    public async findAll(): Promise<Entity[]> {
        return this.model.find();
    }

    public async findById(id: string): Promise<Entity | null> {
        return this.model.findById(id);
    }
    
    public async create(data: Entity): Promise<void> {
        this.model.create(data);
    }

    public async update(id: string, data: Entity): Promise<void> {
        await this.model.updateOne({ _id: id }, data as unknown as UpdateQuery<Entity>);
    }

    public async delete(id: string): Promise<void> {
        await this.model.deleteOne({ _id: id });
    }

}