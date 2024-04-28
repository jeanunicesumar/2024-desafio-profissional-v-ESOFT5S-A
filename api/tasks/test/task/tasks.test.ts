import { describe, beforeAll, beforeEach, afterAll, it, expect } from '@jest/globals';
import { Seed } from '../config/seed';
import supertest from 'supertest';
import { tasks } from './data.task';
import mongoose from 'mongoose';
import { StatusTask } from '../../src/domain/enums/status.task';

describe('Tasks', () => {

    let request: any;
    let seed: Seed;

    beforeAll(async () => {
        seed = new Seed();
        request = supertest(seed.express);
    });

    beforeEach(async () => {
        await seed.deleteAllDocuments('tasks');
        await seed.insertDataDefault(tasks, 'tasks');
    });

    afterAll(async () => {
        await seed.dropDatabase()
        await seed.closeDatabaseConnection();
    });

    describe('GET /tasks', () => {
        it('should return tasks', async () => {
            const response = await request.get('/tasks');
            const result = await response.body;
    
            expect(response.statusCode).toEqual(200);
            expect(result.length).toEqual(3);
        });
    });

    describe('GET /tasks/:id', () => {
        it('should return task by id', async () => {
            const taskId = "661317e10b061b35263b93d0";
            const response = await request.get(`/tasks/${taskId}`);
            const result = await response.body;
    
            expect(response.statusCode).toEqual(200);
            expect(result.title).toBe("Mudar");
        });

        it('should return 404 task not found', async () => {
            const categoryId = "661317e10b061b35263b93d2";
            const response = await request.get(`/tasks/${categoryId}`);
            const result = await response.body;
    
            expect(response.statusCode).toEqual(404);
            expect(result.message).toBe("661317e10b061b35263b93d2 not found");
        });
    });

   describe('POST /tasks', () => {
        it('should return created task', async () => {

            const currentDate = new Date();
            const newDate = new Date(currentDate.setDate(currentDate.getDate() + 5));

            const newTask = {
                description: "Tentar codar",
                title: "Codar",
                dateConclusion: newDate,
                type: "Teste",
                status: StatusTask.PENDING,
                user: new mongoose.Types.ObjectId("661317e10b061b35263b93d1")
            }
            
            let responseTasks = await request.get('/tasks');
            let resultTasks = await responseTasks.body;
    
            expect(resultTasks.length).toEqual(3);

            const response = await request.post(`/tasks`).send(newTask);
            expect(response.statusCode).toEqual(201);
            
            responseTasks = await request.get('/tasks');
            resultTasks = await responseTasks.body;

            expect(responseTasks.statusCode).toEqual(200);
            expect(resultTasks.length).toEqual(4);

            const taskExpected = resultTasks.filter((task: any) => task.title === 'Codar');
            expect(taskExpected[0].description).toBe('Tentar codar');
        });
    });

    describe('PUT /tasks', () => {
        it('should return updated task', async () => {

            const taskId = "661317e10b061b35263b93d0";
            let response = await request.get(`/tasks/${taskId}`);
            let result = await response.body;
    
            expect(response.statusCode).toEqual(200);
            expect(result.title).toBe("Mudar");
            expect(result.description).toBe("Tentar mudar");

            const newTask = {
                title: "Mudei",
                description: "Consegui mudar"
            }

            response = await request.put(`/tasks/${taskId}`).send(newTask);
            expect(response.statusCode).toEqual(200);
            
            response = await request.get(`/tasks/${taskId}`);
            result = await response.body;
    
            expect(response.statusCode).toEqual(200);
            expect(result.title).toBe("Mudei");
            expect(result.description).toBe("Consegui mudar");
        });
    });

    describe('DELETE /tasks', () => {
        it('should return deleted task', async () => {

            let responseTasks = await request.get('/tasks');
            let resultTasks = await responseTasks.body;
    
            expect(resultTasks.length).toEqual(3);
            expect(responseTasks.statusCode).toEqual(200);

            const taskId = "661317e10b061b35263b93d0";
            let response = await request.delete(`/tasks/${taskId}`);
    
            expect(response.statusCode).toEqual(204);

            responseTasks = await request.get('/tasks');
            resultTasks = await responseTasks.body;
    
            expect(resultTasks.length).toEqual(2);
            expect(responseTasks.statusCode).toEqual(200);
        });
    });
    
});