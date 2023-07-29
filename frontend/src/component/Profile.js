import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from './Auth'

const Profile = (props) => {
    Auth();
    const[msg,setMsg]=useState("Do You Really Want to Delete Account?");
    const[sty,setStyle]=useState({color:"black"})

    const[Pop,SetPop]=useState({
        visibility:"hidden"
    })
    const navigate = useNavigate();
    useEffect(() => {
        props.setProgress(100);
        document.title = `DailyNews- Your Profile`
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])
    const openForm = () => {
        SetPop({visibility:"visible"});  
    }

    const closeForm=()=>{
        SetPop({visibility:"hidden"});
    }
     

    const logout=()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('profession');
      navigate("/")
    }


    const DelAction=async(event)=>{
        console.log("hii");
        event.preventDefault();
        const formdata = {
            "username": localStorage.getItem('username')
           

        }
        const response=await fetch("http://localhost:3001/user/delete",{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(formdata),

        });
        const result = await response.json();
        console.log(result);
        if(result.data){
          console.log(result.data);
           setMsg("Your account is Deleted");
           setStyle({color:"red"})
          setTimeout(nav,2000);
        }
        else{
            console.log(result.data.error);
        }

    }

    const nav=()=>{
        localStorage.removeItem('token');
        navigate("/");
    }

    return (
        <div className='ProfileTop centerized'>
            <div className='ProfileInfo'>
                <div className='profileHead centerized'><h2 style={{color:"rgb(12, 6, 23)"}}>YOUR PROFILE</h2></div>
                <div className='centerized'>
                    <img className='img1' src="./profile.png.png" alt="" />
                </div>
                <div className='centerized'><h6 style={{fontWeight:"700"}}>{"Username : " + " " + ( localStorage.getItem('username')) }</h6></div>
                <div className='centerized'><h6 style={{fontWeight:"700"}}>{"Email :" + " " + (localStorage.getItem('email')) }</h6></div>
                <div className='centerized'><h6 style={{fontWeight:"700"}}>{localStorage.getItem('profession')!=='' ? ("Profession:" + " " + localStorage.getItem('profession')) :""} </h6></div>
                <div className='profilebtn centerized'><button className='btn1 logoutBtn' onClick={logout}>Log Out</button>
                <button onClick={openForm} className='alert centerized' >DELETE MY ACCOUNT</button>
                </div>

                <div className='centerized'>
                    <div className='PopupForm centerized' style={Pop} >
                        <h6 style={sty}>{msg}</h6>
                        <div>
                            <button disabled={msg==="Your account is Deleted"} className='btn1' onClick={DelAction}>Yes</button>
                            <button  disabled={msg==="Your account is Deleted"} className='btn1' onClick={closeForm}>No</button>
                        </div>
                        
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Profile