import { Schema } from "mongoose";

export default interface Iuser{
    username: string,
    email:string,
    password:string,
    profession?:string
};

export default interface Iuser1{
    username:string,
    password:string
}

export default interface Iuser2{
    username:string,
    email:string
}