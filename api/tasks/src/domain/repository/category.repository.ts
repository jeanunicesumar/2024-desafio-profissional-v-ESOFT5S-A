import { Category } from './../types/category';
import { Model, Types } from 'mongoose';
import { CrudRepository } from './crud.repository';
const { ObjectId } = Types;

export class CategoryRepository extends CrudRepository<Category> {

    constructor(model: Model<Category>) {
        super(model);
    }

    public async findAllByUser(idUser: string): Promise<Category[]> {

        return this.model.aggregate([
            {
                $lookup: {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'category',
                    as: 'task'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'task.user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { 
                $match: { 'user._id': new ObjectId(idUser) } 
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    color: 1
                }
            }
        ]);
    }

}