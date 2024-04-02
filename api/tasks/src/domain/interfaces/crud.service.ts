
export interface ICrudService<Entity, CreateDTO, UpdateDTO> {

    findAll(): Promise<Entity[]>;

    find(id: string): Promise<Entity>;
    
    create(data: CreateDTO): Promise<void>;

    update(id: string, data: UpdateDTO): Promise<void>;

    delete(id: string): Promise<void>;
        

}