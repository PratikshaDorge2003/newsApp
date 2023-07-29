import { routes } from "./route.data";
import { Application, NextFunction, Request, Response, json } from "express";
import { ResponseHandler } from "../utility/response.handle";


export const registerRoute=(app:Application)=>{
    app.use(json());
    
    for(let route of routes){
        app.use(route.path, route.router);
    }

    app.use((error:any,req:Request,res:Response,next:NextFunction)=>{
        res.send(new ResponseHandler(null,error));

    })
}
