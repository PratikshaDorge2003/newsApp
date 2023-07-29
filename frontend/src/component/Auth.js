import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Auth=()=> {
    console.log("inside AUth");
    const navigate=useNavigate();
    useEffect(()=>{
     const token=localStorage.getItem('token');
     console.log(token);
     if(!token){
        navigate("/");
     }
   },[navigate]);
   

  return null
}

export default Auth