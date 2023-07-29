import { Schema,Document,model } from "mongoose";
import Iuser from "./user.types";

const userschema=new Schema({
    username:{
        type:String,
        required:true
    },
    
    email:{
        type:String
    },

    password:{
        type:String,
        required:true
    },
    profession:{
        type:String,
       
    },

    isDeleted:{
        type:Boolean,
        default:false
    },

    token:{
        type:String
    }
    
})

export const userModel=model<Iuser & Document>("users",userschema);