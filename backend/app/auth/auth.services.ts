import Iuser from "../user/user.types"
import userServices from "../user/user.services"
import { compare, genSalt, hash } from "bcryptjs";
import ICredentials from "./auth.types";

export const encryptPassword=async (user:Iuser)=>{
    const salt=await genSalt(10);
    const hpassword= await hash(user.password,salt);
    user.password=hpassword;
    return user
}


const Register=async(user:Iuser)=>{
    try{
      const olduser=await userServices.findone({username:user.username});
      console.log(olduser);
       if(olduser) throw("Username already exists");
       const email=await userServices.findone({email:user.email});
       if(email) throw("EMAIL Already Exist");
       user=await encryptPassword(user);
      const details=await userServices.addone(user);
      return details;
    }
    catch(error){
        throw error
    }
}

const Login=async(Credentials:ICredentials)=>{
    try{
    const user=await userServices.findone({username:Credentials.username});
    if(!user) throw("Username not exists");
    const PasswordMatch= await compare(Credentials.password,user.password);
    if(!PasswordMatch) throw("Wrong password");
    return(user);
    }
    catch(error){
        throw error
    }
    
}

export default{
    Register,Login
}