import { Document } from "mongoose";

export interface User extends Document {
    _id: string,
    username: string,
    weight: Number,
    email: string, 
    password: string
}