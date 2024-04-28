import mongoose from 'mongoose';
import { StatusTask } from '../../src/domain/enums/status.task';

const tasks = [
    {
        _id: new mongoose.Types.ObjectId("661317e10b061b35263b93d0"),
        description: "Tentar mudar",
        title: "Mudar",
        dateCreate: Date.now(), 
        dateConclusion: Date.now(),
        type: "Teste",
        status: StatusTask.PENDING,
        user: new mongoose.Types.ObjectId("661317e10b061b35263b93d1")
    },
    {
        _id: new mongoose.Types.ObjectId("6613139730cfcd9cbc7d19f3"),
        description: "Tentar pensar",
        title: "Pensar",
        dateCreate: Date.now(), 
        dateConclusion: Date.now(),
        type: "Teste",
        status: StatusTask.PENDING,
        user: new mongoose.Types.ObjectId("661317e10b061b35263b93d1")
    },
    {
        _id: new mongoose.Types.ObjectId("6613139730cfcd9cbc7d19f4"),
        description: "Tentar agir",
        title: "Agir",
        dateCreate: Date.now(), 
        dateConclusion: Date.now(),
        type: "Teste",
        status: StatusTask.PENDING,
        user: new mongoose.Types.ObjectId("661317e10b061b35263b93d1")
    }
];

export { tasks }