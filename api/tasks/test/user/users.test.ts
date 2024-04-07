import { describe, beforeAll, beforeEach, afterAll, it, expect } from '@jest/globals';
import { Seed } from '../config/seed';
import supertest from 'supertest';
import { users } from './data.user';

describe('Users', () => {

    let request: any;
    let seed: Seed;

    beforeAll(async () => {
        seed = new Seed();
        request = supertest(seed.express);
    });

    beforeEach(async () => {
        await seed.deleteAllDocuments('users');
        await seed.insertDataDefault(users, 'users');
    });

    afterAll(async () => {
        await seed.dropDatabase()
        await seed.closeDatabaseConnection();
    });

    describe('GET /users', () => {
        it('should return users', async () => {
            const response = await request.get('/users');
            const result = await response.body;
    
            expect(response.statusCode).toEqual(200);
            expect(result.length).toEqual(3);
        });
    });

    describe('GET /users/:id', () => {
        it('should return user by id', async () => {
            const userId = "661317e10b061b35263b93d0";
            const response = await request.get(`/users/${userId}`);
            const result = await response.body;
    
            expect(response.statusCode).toEqual(200);
            expect(result.username).toBe("jean123");
        });

        it('should return 404 user not found', async () => {
            const userId = "661317e10b061b35263b93d1";
            const response = await request.get(`/users/${userId}`);
            const result = await response.body;
    
            expect(response.statusCode).toEqual(404);
            expect(result.message).toBe("661317e10b061b35263b93d1 not found");
        });
    })
    
});