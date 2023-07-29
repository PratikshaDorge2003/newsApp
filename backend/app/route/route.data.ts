import { Routes } from "./route.type";
import UserRouter from "../user/user.router";
import AuthRouter from "../auth/auth.routes";

export const routes: Routes[]=[
    new Routes("/user", UserRouter),
    new Routes("/auth", AuthRouter)
]