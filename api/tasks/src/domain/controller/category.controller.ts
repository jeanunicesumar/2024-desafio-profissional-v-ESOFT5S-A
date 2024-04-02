import { Request, Response } from 'express'
import { StatusCode } from "../enums/status.code";
import { CategoryService } from '../service/category.service';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';
import { Category } from '../types/category';
import { CrudController } from './crud.controller';

export class CategoryController extends CrudController<Category, CreateCategoryDTO, UpdateCategoryDTO> {

    protected readonly service: CategoryService

    constructor(service: CategoryService) {
        super(service);
        this.service = service;
    }

    public async findAllByUser(request: Request, response: Response): Promise<void> {
        const idUser: string = request.params.id;

        const categories: Category[] = await this.service.findAllByUser(idUser)
        response.status(StatusCode.SUCCESS).json(categories)
    }

}