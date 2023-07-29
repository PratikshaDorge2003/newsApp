import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Register=(props)=> {
    
    const [Emaildata, setemail] = useState("");
    const [UserName, SetUsername] = useState("");
    const [error, seterror] = useState("");
    const [Password, setPassword] = useState("");
    const[PData,SetPData]=useState("");
    const navigate = useNavigate();
   

    useEffect(()=>{
        
        props.SetdisplayContent({
            display:"none"
        })
        document.title = `DailyNews`
         // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[])

    const actionHandler = async (event) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com/;
        if (!Emaildata.match(regex)) {
            seterror("Invalid email id")
        }
        else if(UserName.length<=0){
            seterror("Invalid Username");
        }

        else if (Password.length < 7) {
            seterror("Password is too short")
        }
        else {
            event.preventDefault();
            const formdata = {
                "username": UserName,
                "password": Password,
                "email": Emaildata,
                "profession":PData

            }

            const response = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(formdata),
            });
            const result = await response.json();

            if (result.data) {
                localStorage.setItem('token', result.data.accessToken);
                localStorage.setItem('username',result.data.username);
                localStorage.setItem('email',result.data.email);
                if(!result.data.profession){
                    localStorage.setItem('profession','')
                }
                else{
                    localStorage.setItem('profession',result.data.profession)
                }
                SetUsername('');
                setPassword(' ');
                props.SetdisplayContent({
                    display:"block"
                })

                navigate("/general");

            }
            else {
                seterror(result.error);
            }
        }
    }

    const handleEmailChange = (event) => {
        setemail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleUserNamechange = (event) => {
        SetUsername(event.target.value);
    }

    const handlePChange=(event)=>{
        SetPData(event.target.value);
    }


    return (
        <div className='background'>
            <div className='topDiv centerized'>
                <h2 style={{ marginBottom: "1px" }}>DAILY-NEWS</h2>
                <h5 style={{ marginTop: "1px" }}>TOP HEADLINES OF THE WORLD</h5>

                <div className='loginpage centerized'>
                    <div><h5 className='header'>Create New Account</h5></div>
                    <div><input className='text' placeholder='* Email' value={Emaildata} onChange={handleEmailChange} /></div>
                    <div><input className='text' placeholder='* UserName' value={UserName} onChange={handleUserNamechange} /></div>
                    <div><input className='text' placeholder='Profession' value={PData} onChange={handlePChange} /></div>
                    <div ><input className='text' placeholder='* Password' value={Password} onChange={handlePasswordChange} /></div>
                    <div><button onClick={actionHandler} className='SignBtn'>Register</button></div>
                    <div className='bottom'>
                        <div>Already had account?</div>
                        <div><Link className='header' to="/login">Log In</Link></div>
                    </div>
                    <div style={{ color: "red" }}><h6>{error}</h6></div>
                </div>
                <div >CONTACT US  :  daily-news@gmail.com </div>

            </div>


            <div className='BottomDetails centerized'>
                <div className='left centerized'>
                    <img className='AboutImg' src="./image.png" alt="" />
                </div>
                <div className='right'>
                    <div className='BottomHead centerized' >
                        <h2 style={{ color: "rgb(17, 19, 30)" }}>ABOUT US</h2>
                    </div>
                    <h6>
                        Welcome to DAILY NEWS!

                        Myself Swaraj Dorge with the team Pratiksha, Vishal, and Priyanka Dorge to provide you uptodate news. Our mission is to deliver accurate, timely, and comprehensive news coverage to our readers. We strive to provide a platform that informs, educates, and engages users on a wide range of topics, including current events, politics, business, technology, entertainment, sports, and more.

                        As an independent digital news publication, we are committed to upholding the highest journalistic standards. Our team of experienced journalists and reporters is dedicated to thorough research, fact-checking, and unbiased reporting. We aim to present news stories from multiple perspectives, fostering a well-informed and inclusive discourse.</h6>
                </div>
            </div>
        </div>

    )
}

export default Register