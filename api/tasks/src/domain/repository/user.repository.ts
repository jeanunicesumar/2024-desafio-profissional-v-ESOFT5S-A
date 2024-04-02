import { CrudRepository } from './crud.repository';
import { User } from '../types/user';
import { Model } from 'mongoose';

export class UserRepository extends CrudRepository<User> {

    constructor(model: Model<User>) {
        super(model);
    }

    public async findByEmail(email: string): Promise<User | null> {
        return this.model.findOne({ email: email });
    } 

}