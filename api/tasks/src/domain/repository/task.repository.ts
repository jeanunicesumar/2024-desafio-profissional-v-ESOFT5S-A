import taskModel from '../entity/task.schema'
import { Task } from '../types/task';
import { CrudRepository } from './crud.repository';
import { Model } from 'mongoose';

export class TaskRepository extends CrudRepository<Task> {

    constructor(model: Model<Task>) {
        super(model);
    }

    public async findAllByUser(idUser: string): Promise<Task[]> {
        return taskModel.find({ user: idUser });
    }

}