import { NotFoundError } from './../helpers/errors/not-found.error';
import { ICrudRepository } from "../interfaces/crud.repository";
import { ICrudService } from "../interfaces/crud.service";
import { StatusCode } from '../enums/status.code';
import { Document } from 'mongoose';

export class CrudService<Entity extends Document, CreateDTO, UpdateDTO> 
    implements ICrudService<Entity, CreateDTO, UpdateDTO> {

    protected readonly repository: ICrudRepository<Entity>;

    constructor(repository: ICrudRepository<Entity>) {
        this.repository = repository;
    }

    public async findAll(): Promise<Entity[]> {
        return this.repository.findAll();
    }

    public async find(id: string): Promise<Entity> {
        return this.findById(id);
    }
    
    public async create(data: CreateDTO): Promise<void> {
        this.repository.create(data as unknown as Entity);
    }

    public async update(id: string, data: UpdateDTO): Promise<void> {
        await this.findById(id);
        this.repository.update(id, data as unknown as Entity);
    }

    public async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    private async findById(id: string) {

        const dataFound = await this.repository.findById(id);

        if(!dataFound) {
            throw new NotFoundError(`${id} not found`, StatusCode.NOT_FOUND);
        }

        return dataFound;

    }

} 