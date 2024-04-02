import { Request, Response } from 'express'
import { UserService } from "../service/user.service";
import { StatusCode } from "../enums/status.code";
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { User } from '../types/user';
import { LoginUserDTO } from '../dtos/login-user.dto';
import { CrudController } from './crud.controller';

export class UserController extends CrudController<User, CreateUserDTO, UpdateUserDTO> {

    protected readonly service: UserService;

    constructor(service: UserService) {
        super(service);
        this.service = service;
    }

    public async auth(request: Request, response: Response): Promise<void> {

        const dataUser: LoginUserDTO = request.body;

        await this.service.auth(dataUser)
        response.status(StatusCode.SUCCESS).json()

    }

}