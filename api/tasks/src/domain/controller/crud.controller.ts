import { StatusCode } from './../enums/status.code';
import { ICrudService } from "../interfaces/crud.service";
import { Request, Response } from "express";
import { ICrudController } from '../interfaces/crud.controller';

export class CrudController<Entity, CreateDTO, UpdateDTO> implements ICrudController {

    protected readonly service: ICrudService<Entity, CreateDTO, UpdateDTO>;

    constructor(service: ICrudService<Entity, CreateDTO, UpdateDTO>) {
        this.service = service;
    }

    public async findAll(request: Request, response: Response): Promise<void> {
        const values: Entity[] = await this.service.findAll();

        response.status(StatusCode.SUCCESS).json(values);

    }

    public async findById(request: Request, response: Response): Promise<void> {
        const idValue: string = request.params.id;

        const foundValue: Entity = await this.service.find(idValue);
        response.status(StatusCode.SUCCESS).json(foundValue);

    }   

    public async create(request: Request, response: Response): Promise<void> {
        const value: CreateDTO = request.body;

        await this.service.create(value)
        response.status(StatusCode.CREATED).json()

    }

    public async update(request: Request, response: Response): Promise<void> {
        const idValue: string = request.params.id
        const value: UpdateDTO = request.body

        await this.service.update(idValue, value)
        response.status(StatusCode.SUCCESS).json()
    }

    public async delete(request: Request, response: Response): Promise<void> {
        const idValue: string = request.params.id

        await this.service.delete(idValue)
        response.status(StatusCode.NO_CONTENT).json()

    }    

}