import { UpdateTaskDTO } from './../dtos/update-task.dto';
import { Request, Response } from 'express'
import { StatusCode } from "../enums/status.code";
import { TaskService } from '../service/task.service';
import { Task } from '../types/task';
import { CreateTaskDTO } from '../dtos/create-task.dto';
import { TasksByCategory } from '../types/tasksByCategory';
import { CrudController } from './crud.controller';

export class TaskController extends CrudController<Task, CreateTaskDTO, UpdateTaskDTO> {

    protected readonly service: TaskService

    constructor(service: TaskService) {
        super(service);
        this.service = service;
    }

    public async findAllByUser(request: Request, response: Response): Promise<void> {
        const idUser: string = request.params.id;

        const tasks: Task[] =  await this.service.findAllByUser(idUser);
        response.status(StatusCode.SUCCESS).json(tasks)
    }

    public async findAllByCategory(request: Request, response: Response): Promise<void> {
        const idCategory: string = request.params.id;

        const tasks: Task[] =  await this.service.findAllByCategory(idCategory);
        response.status(StatusCode.SUCCESS).json(tasks)
    }

    public async findAllByStatus(request: Request, response: Response): Promise<void> {
        const status: string = request.query.name as string;

        const tasks: Task[] =  await this.service.findAllByStatus(status);
        response.status(StatusCode.SUCCESS).json(tasks)
    }

    public async findAllByPeriodDateConclusion(request: Request, response: Response): Promise<void> {
        const initialDate: Date = new Date(request.query.initialDate as string);
        const finalDate: Date = new Date(request.query.finalDate as string);

        const tasks: Task[] =  await this.service.findAllByPeriodDateConclusion(initialDate, finalDate);
        response.status(StatusCode.SUCCESS).json(tasks)
    }

    public async countByUser(request: Request, response: Response): Promise<void> {
        const idUser: string = request.params.id;

        const quantity: number =  await this.service.countByUser(idUser);
        response.status(StatusCode.SUCCESS).json({ total: quantity })
    }

    public async findFirstByUser(request: Request, response: Response): Promise<void> {
        const idUser: string = request.params.id;

        const task: Task =  await this.service.findFirstByUser(idUser);
        response.status(StatusCode.SUCCESS).json(task)
    }

    public async findLastByUser(request: Request, response: Response): Promise<void> {
        const idUser: string = request.params.id;

        const task: Task =  await this.service.findLastByUser(idUser);
        response.status(StatusCode.SUCCESS).json(task)
    }

    public async findByCompletedAvg(request: Request, response: Response): Promise<void> {
        const average: number =  await this.service.findByCompletedAvg();
        
        response.status(StatusCode.SUCCESS).json({ average: average })
    }

    public async findByDescriptionBigger(request: Request, response: Response): Promise<void> {
        const task: Task =  await this.service.findByDescriptionBigger();
        
        response.status(StatusCode.SUCCESS).json(task)
    }

    public async findAndGroupByCategory(request: Request, response: Response): Promise<void> {
        const tasksByCategory: TasksByCategory = await this.service.findAndGroupByCategory();

        response.status(StatusCode.SUCCESS).json(tasksByCategory)
    }

}