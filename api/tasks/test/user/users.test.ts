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
    });

    describe('POST /users', () => {
        it('should return created user', async () => {

            const newUser = {
                username: "jean1234",
                weight: 70,
                password: "teste",
                email: "jean232@gmail.com"
            }
            
            let responseUsers = await request.get('/users');
            let resultUsers = await responseUsers.body;
    
            expect(resultUsers.length).toEqual(3);

            const response = await request.post(`/users`).send(newUser);
            expect(response.statusCode).toEqual(201);
            
            responseUsers = await request.get('/users');
            resultUsers = await responseUsers.body;

            expect(responseUsers.statusCode).toEqual(200);
            expect(resultUsers.length).toEqual(4);

            const userExpected = resultUsers.filter((user: any) => user.username === 'jean1234');
            expect(userExpected[0].email).toBe('jean232@gmail.com');
        });
    });

    describe('POST /auth', () => {
        it('should return user valid', async () => {

            const user = {
                password: "teste",
                email: "jean@gmail.com"
            }

            const response = await request.post(`/users/auth`).send(user);
            expect(response.statusCode).toEqual(200);
        });

        it('should return user not valid', async () => {

            const user = {
                password: "teste12",
                email: "jean@gmail.com"
            }

            const response = await request.post(`/users/auth`).send(user);
            expect(response.statusCode).toEqual(401);
        });
    });

    describe('PUT /users', () => {
        it('should return updated user', async () => {

            const userId = "661317e10b061b35263b93d0";
            let response = await request.get(`/users/${userId}`);
            let result = await response.body;
    
            expect(response.statusCode).toEqual(200);
            expect(result.username).toBe("jean123");
            expect(result.email).toBe("jean@gmail.com");

            const newUser = {
                username: "jean1234",
                email: "jean232@gmail.com"
            }

            response = await request.put(`/users/${userId}`).send(newUser);
            expect(response.statusCode).toEqual(200);
            
            response = await request.get(`/users/${userId}`);
            result = await response.body;
    
            expect(response.statusCode).toEqual(200);
            expect(result.username).toBe("jean1234");
            expect(result.email).toBe("jean232@gmail.com");
        });
    });

    describe('DELETE /users', () => {
        it('should return deleted user', async () => {

            let responseUsers = await request.get('/users');
            let resultUsers = await responseUsers.body;
    
            expect(resultUsers.length).toEqual(3);
            expect(responseUsers.statusCode).toEqual(200);

            const userId = "661317e10b061b35263b93d0";
            let response = await request.delete(`/users/${userId}`);
    
            expect(response.statusCode).toEqual(204);

            responseUsers = await request.get('/users');
            resultUsers = await responseUsers.body;
    
            expect(resultUsers.length).toEqual(2);
            expect(responseUsers.statusCode).toEqual(200);
        });
    });
    
});