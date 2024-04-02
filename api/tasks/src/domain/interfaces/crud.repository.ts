
export interface ICrudRepository<Entity> {

    findAll(): Promise<Entity[]>;

    findById(id: string): Promise<Entity | null>;

    create(data: Entity): Promise<void>;

    update(id: string, data: Entity): Promise<void>;

    delete(id: string): Promise<void>;

}