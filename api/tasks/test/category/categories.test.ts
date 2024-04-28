import { describe, beforeAll, beforeEach, afterAll, it, expect } from '@jest/globals';
import { Seed } from '../config/seed';
import supertest from 'supertest';
import { categories } from './data.category';

describe('Categories', () => {

    let request: any;
    let seed: Seed;

    beforeAll(async () => {
        seed = new Seed();
        request = supertest(seed.express);
    });

    beforeEach(async () => {
        await seed.deleteAllDocuments('categories');
        await seed.insertDataDefault(categories, 'categories');
    });

    afterAll(async () => {
        await seed.dropDatabase()
        await seed.closeDatabaseConnection();
    });

    describe('GET /categories', () => {
        it('should return categories', async () => {
            const response = await request.get('/categories');
            const result = await response.body;
    
            expect(response.statusCode).toEqual(200);
            expect(result.length).toEqual(3);
        });
    });

    describe('GET /categories/:id', () => {
        it('should return category by id', async () => {
            const categoryId = "661317e10b061b35263b93d0";
            const response = await request.get(`/categories/${categoryId}`);
            const result = await response.body;
    
            expect(response.statusCode).toEqual(200);
            expect(result.name).toBe("Desenvolvimento");
        });

        it('should return 404 category not found', async () => {
            const categoryId = "661317e10b061b35263b93d1";
            const response = await request.get(`/categories/${categoryId}`);
            const result = await response.body;
    
            expect(response.statusCode).toEqual(404);
            expect(result.message).toBe("661317e10b061b35263b93d1 not found");
        });
    });

    describe('POST /categories', () => {
        it('should return created category', async () => {

            const newCategory = {
                name: "Front",
                color: "blue"
            }
            
            let responseCategories = await request.get('/categories');
            let resultCategories = await responseCategories.body;
    
            expect(resultCategories.length).toEqual(3);

            const response = await request.post(`/categories`).send(newCategory);
            expect(response.statusCode).toEqual(201);
            
            responseCategories = await request.get('/categories');
            resultCategories = await responseCategories.body;

            expect(responseCategories.statusCode).toEqual(200);
            expect(resultCategories.length).toEqual(4);

            const categoryExpected = resultCategories.filter((category: any) => category.name === 'Front');
            expect(categoryExpected[0].color).toBe('blue');
        });
    });

    describe('PUT /categories', () => {
        it('should return updated category', async () => {

            const categoryId = "661317e10b061b35263b93d0";
            let response = await request.get(`/categories/${categoryId}`);
            let result = await response.body;
    
            expect(response.statusCode).toEqual(200);
            expect(result.name).toBe("Desenvolvimento");
            expect(result.color).toBe("green");

            const newCategory = {
                name: "Desenvolvimento Mobile",
                color: "purple"
            }

            response = await request.put(`/categories/${categoryId}`).send(newCategory);
            expect(response.statusCode).toEqual(200);
            
            response = await request.get(`/categories/${categoryId}`);
            result = await response.body;
    
            expect(response.statusCode).toEqual(200);
            expect(result.name).toBe("Desenvolvimento Mobile");
            expect(result.color).toBe("purple");
        });
    });

    describe('DELETE /categories', () => {
        it('should return deleted category', async () => {

            let responseCategories = await request.get('/categories');
            let resultCategories = await responseCategories.body;
    
            expect(resultCategories.length).toEqual(3);
            expect(responseCategories.statusCode).toEqual(200);

            const categoryId = "661317e10b061b35263b93d0";
            let response = await request.delete(`/categories/${categoryId}`);
    
            expect(response.statusCode).toEqual(204);

            responseCategories = await request.get('/categories');
            resultCategories = await responseCategories.body;
    
            expect(resultCategories.length).toEqual(2);
            expect(responseCategories.statusCode).toEqual(200);
        });
    });
    
});