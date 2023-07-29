import { FilterQuery,UpdateQuery } from "mongoose";
import { userModel } from "./user.schema";
import Iuser from "./user.types";
import Iuser1 from "./user.types";
import Iuser2 from "./user.types";
import { compare, genSalt, hash } from "bcryptjs";
import { NextFunction, Request, Response } from "express"




const findone= (filter: FilterQuery<Iuser>)=>userModel.findOne({...filter,isDeleted:false})
const addone=(user:Iuser)=>userModel.create(user);
const update=(filter:FilterQuery<Iuser>,data:UpdateQuery<Iuser>)=>userModel.updateMany(filter,data);



const removeuser=async(Username:string)=>{
    try{
          const result=await update({username:Username},{isDeleted:true});
          console.log(result);
          if(result.modifiedCount===0) throw("Unable to proceed");
          return (result);
    }
    catch(error){
        throw error
    }

}

const change=async(user:Iuser1)=>{
    try{
      
       const salt=await genSalt(10);
       const hpassword= await hash(user.password,salt);
       user.password=hpassword;
       const details=await update({username:user.username},{password:user.password})
       return ("Password changed successfully");

    }
    catch(error){
        throw error
    }
}

const check=async (user:Iuser2)=>{
    
    try{
        const result=await findone({username:user.username});
        if(!result) throw(" Username not exists");
        if(result.email !== user.email) throw("Wrong email");
        return result;
    }
    catch(error){
        throw(error);
    } 
}

export default{
    findone,addone,update,removeuser,change,check
}