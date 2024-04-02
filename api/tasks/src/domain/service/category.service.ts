import { CategoryRepository } from '../repository/category.repository';
import { Category } from '../types/category';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';
import { CrudService } from './crud.service';

export class CategoryService extends CrudService<Category, CreateCategoryDTO, UpdateCategoryDTO> {

    protected readonly repository: CategoryRepository;

    constructor(repository: CategoryRepository) {
        super(repository)
        this.repository = repository;
    }

    public async findAllByUser(idUser: string): Promise<Category[]> {
        return this.repository.findAllByUser(idUser);
    }

}