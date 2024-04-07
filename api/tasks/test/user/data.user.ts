import mongoose from 'mongoose';

const users = [
    {
        _id: new mongoose.Types.ObjectId("661317e10b061b35263b93d0"),
        username: "jean123",
        weight: 70,
        password: "teste",
        email: "jean@gmail.com"
    },
    {
        _id: new mongoose.Types.ObjectId("6613139730cfcd9cbc7d19f3"),
        username: "cassia123",
        weight: 70,
        password: "teste",
        email: "cassia@gmail.com"
    },
    {
        _id: new mongoose.Types.ObjectId("6613139730cfcd9cbc7d19f4"),
        username: "kenji123",
        weight: 70,
        password: "teste",
        email: "kenji@gmail.com"
    }
];

export { users }