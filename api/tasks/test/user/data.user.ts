import mongoose from 'mongoose';

const users = [
    {
        _id: new mongoose.Types.ObjectId("661317e10b061b35263b93d0"),
        username: "jean123",
        weight: 70,
        password: "$2b$10$QuG/62BfvUy9RVFafv/oxuV8APGv4s1J88WwvylUr18a7L.KhTPRC",
        email: "jean@gmail.com"
    },
    {
        _id: new mongoose.Types.ObjectId("6613139730cfcd9cbc7d19f3"),
        username: "cassia123",
        weight: 70,
        password: "$2b$10$QuG/62BfvUy9RVFafv/oxuV8APGv4s1J88WwvylUr18a7L.KhTPRC",
        email: "cassia@gmail.com"
    },
    {
        _id: new mongoose.Types.ObjectId("6613139730cfcd9cbc7d19f4"),
        username: "kenji123",
        weight: 70,
        password: "$2b$10$QuG/62BfvUy9RVFafv/oxuV8APGv4s1J88WwvylUr18a7L.KhTPRC",
        email: "kenji@gmail.com"
    }
];

export { users }