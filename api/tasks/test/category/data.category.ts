import mongoose from 'mongoose';

const categories = [
    {
        _id: new mongoose.Types.ObjectId("661317e10b061b35263b93d0"),
        name: "Desenvolvimento",
        color: "green"
    },
    {
        _id: new mongoose.Types.ObjectId("6613139730cfcd9cbc7d19f3"),
        name: "Design",
        color: "red"
    },
    {
        _id: new mongoose.Types.ObjectId("6613139730cfcd9cbc7d19f4"),
        name: "DevOps",
        color: "yellow"
    }
];

export { categories }