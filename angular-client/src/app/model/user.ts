import { Role } from "./role";

export interface User {
    id: number;
    username: string;
    fullname: string;
    phoneNumber: string;
    address: string;
    email: string;
    dob: Date;
    gender: string;
    password: string;
    role: Role
}
