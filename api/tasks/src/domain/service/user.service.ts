import { UnauthorizedError } from './../helpers/errors/unauthorized.error';
import { NotFoundError } from './../helpers/errors/not-found.error';
import { UpdateUserDTO } from './../dtos/update-user.dto';
import { CreateUserDTO } from "../dtos/create-user.dto";
import { UserRepository } from "../repository/user.repository";
import { User } from '../types/user';
import { Password } from '../utils/password.utils';
import { StatusCode } from '../enums/status.code';
import { LoginUserDTO } from '../dtos/login-user.dto';
import { CrudService } from './crud.service';
import { DuplicateEmailError } from '../helpers/errors/duplicate-email.error';

export class UserService extends CrudService<User, CreateUserDTO, UpdateUserDTO> {

    protected readonly repository: UserRepository;

    constructor(repository: UserRepository) {
        super(repository);
        this.repository = repository;
    }

    public async create(data: CreateUserDTO): Promise<void> {
        await this.existsUserByEmail(data.email);
        data.password = await Password.generateHash(data.password);
        this.repository.create(data as User);
    }

    public async auth(user: LoginUserDTO): Promise<void> {

        const foundUser: User = await this.findByEmail(user.email);

        const isValidPassword = await Password.compare(user.password, foundUser.password);

        if(!isValidPassword) {
            throw new UnauthorizedError('Password invalid', StatusCode.UNAUTHORIZED);
        }

    }

    private async existsUserByEmail(email: string): Promise<void> {

        const user: User | null = await this.repository.findByEmail(email);

        if(!user) {
            throw new DuplicateEmailError(`User ${email} already exists`, StatusCode.BAD_REQUEST);
        }
    }

    private async findByEmail(email: string): Promise<User> {

        const user: User | null = await this.repository.findByEmail(email);

        if(!user) {
            throw new NotFoundError(`User ${email} not found`, StatusCode.NOT_FOUND);
        }

        return user;

    }

}