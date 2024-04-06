import { InvalidQueryError } from './../helpers/errors/invalid-query.error';
import { CreateTaskDTO } from './../dtos/create-task.dto';
import { Task } from '../types/task';
import { TaskRepository } from './../repository/task.repository';
import { StatusCode } from '../enums/status.code';
import { StatusTask } from '../enums/status.task';
import { TasksByCategory } from '../types/tasksByCategory';
import { UpdateTaskDTO } from '../dtos/update-task.dto';
import { CrudService } from './crud.service';

export class TaskService extends CrudService<Task, CreateTaskDTO, UpdateTaskDTO> {

    protected readonly repository: TaskRepository;

    constructor(repository: TaskRepository) {
        super(repository);
        this.repository = repository;
    }

    public async findAllByUser(idUser: string): Promise<Task[]> {
        return this.repository.findAllByUser(idUser);
    }

    public async findAllByCategory(idCategory: string): Promise<Task[]> {
        const tasks: Task[] = await this.repository.findAll();

        return tasks.filter(task => task.category?._id === idCategory);
    }

    public async findAllByStatus(status: string): Promise<Task[]> {

        if(!this.isValidStatus(status)) {
            throw new InvalidQueryError(`Status ${status} invalid`, StatusCode.BAD_REQUEST);
        }

        const tasks: Task[] = await this.repository.findAll();

        return tasks.filter(task => task.status === status);
    }

    public async findAllByPeriodDateConclusion(initialDate: Date, finalDate: Date): Promise<Task[]> {
        const tasks: Task[] = await this.repository.findAll();

        return tasks.filter(task => this.isDateBetween(task.dateConclusion, initialDate, finalDate));
    }

    public async findFirstByUser(idUser: string): Promise<Task> {
        const tasks: Task[] = await this.repository.findAll();

        return this.filterAllByUser(tasks, idUser)
                .sort((a, b) => this.sortByDate(a.dateCreate, b.dateCreate))[0];
    }

    public async findLastByUser(idUser: string): Promise<Task> {
        const tasks: Task[] = await this.repository.findAll();

        return this.filterAllByUser(tasks, idUser)
                .sort((a, b) => this.sortByDate(b.dateCreate, a.dateCreate))[0];
    }

    public async countByUser(idUser: string) {
        return (await this.findAllByUser(idUser)).length;
    }

    public async findByCompletedAvg(): Promise<number> {
        const tasks: Task[] = await this.repository.findAll();
        const tasksCompleted: Task[] = tasks.filter(task => task.status === StatusTask.COMPLETED);

        if (tasksCompleted.length === 0) {
            return 0;
        }

        const average: Number = (tasksCompleted.length / tasks.length) * 100;
        return parseFloat(average.toFixed(2));

    }

    public async findByDescriptionBigger(): Promise<Task> {
        const tasks: Task[] = await this.repository.findAll();
        const taskFound = tasks.sort((a, b) => b.description.length - a.description.length)[0];

        return taskFound;
    }

    public async findAndGroupByCategory(): Promise<TasksByCategory> {
        const tasks: Task[] = (await this.repository.findAll()).filter(task => task.category);

        const tasksByCategory: TasksByCategory = this.groupingByCategory(tasks);
        return tasksByCategory;
    }

    private isDateBetween(date: Date, initialDate: Date, finalDate: Date): boolean {
        return date >= initialDate && date <= finalDate;
    }

    private filterAllByUser(tasks: Task[], idUser: string): Task[] {
        return tasks.filter(task => task.user?._id == idUser);
    }

    private sortByDate(initialDate: Date, finalDate: Date): number {
        return initialDate.getTime() - finalDate.getTime();
    }

    private groupingByCategory(tasks: Task[]): any {

        const result: TasksByCategory = {}

        tasks.forEach(task => {
            (result[task.category.name] = result[task.category.name] || []).push(task);
        })

        return result;
    }

    private isValidStatus(status: string): boolean {
        const validStatus = Object.values(StatusTask);
        return validStatus.includes(status.toLocaleLowerCase() as StatusTask);
    }

}