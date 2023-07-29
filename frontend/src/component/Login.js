import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';





const Login = (props) => {

    const [sty, setStyle] = useState({
        visibility: "hidden"
    })

    const [InputStyle, SetInputStyle] = useState({ border: "0px" });
    const [sty1, setStyle1] = useState({ display: "none" })
    const [UsernameData, SetUsername] = useState("");
    const [Email, SetEmail] = useState("");
    const [NewPassword, SetNewPassword] = useState("");
    const [NewPassword1, SetNewPassword1] = useState("");
    const [Password, setPassword] = useState("");
    const [error, seterror] = useState("");
    const [error1, seterror1] = useState("");
    const [UserName, SetUserName1] = useState("");
    const [success, setsuccess] = useState("")
    const [OTPDetails, SetOTP] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        props.SetdisplayContent({
            display: "none"
        })
        document.title = `DailyNews`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const openForm = () => {
        setStyle({ visibility: "visible" })
    }

    const closeForm = () => {
        setsuccess("")
        SetUserName1("");
        SetEmail("");
        SetNewPassword("");
        setStyle1({ visibility: "hidden" });
        SetNewPassword1("");
        seterror1("")
        setStyle({ visibility: "hidden" });
        SetInputStyle({
            border: "0px"
        })
        localStorage.removeItem('OTP')
    }

    const Verify = async () => {
        if (OTPDetails === localStorage.getItem("OTP")) {
            console.log("OTP MAtched");
            const form = {
                "username": UserName,
                "password": NewPassword

            }
            const response = await fetch("http://localhost:3001/user/change", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(form),

            });
            const result2 = await response.json();
            setsuccess("Your Password changed successfully");
            setTimeout(closeForm, 2500);
        }
        else {
            setsuccess("Wrong OTP Try Again");
            SetOTP("");
            setStyle1({ visibility: "hidden" });
        }
    }


    const RandomOtp = () => {
        const OTP = Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem('OTP', OTP);
        return OTP
    }
    const SendMail = async () => {
        console.log("hii");
        const OTP = RandomOtp().toString();
        console.log(OTP)
        const formdata = {
            "recipient": Email,
            "subject": "NEWS APP OTP",
            "content": OTP
        }

        const response = await fetch("http://localhost:3001/user/email", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(formdata),

        });
        console.log(OTPDetails);
        const result = response;
        console.log(result);
        if (result === "Error") {
            seterror1("Something Went Wrong");
            SetOTP("");
        }

    }



    const ChangePassword = async (event) => {
        event.preventDefault();


        if (UserName.length <= 0 || Email.length <= 0) {
            seterror1("Invalid Username or Email")
        }

        else if (NewPassword.length === 0 || NewPassword !== NewPassword1) {
            seterror1("Invalid Passwords");
            SetInputStyle({
                border: "2px solid red "
            })
        }

        else if (NewPassword.length < 7) {
            seterror1("Password is too short");
            SetInputStyle({
                border: "0px"
            })
        }

        else {
            seterror1("")
            const formdata = {
                "username": UserName,
                "email": Email
            }
            SetInputStyle({
                border: "0px"
            })

            const response = await fetch("http://localhost:3001/user/check", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(formdata),

            });
            const result = await response.json();
            console.log(result);
            if (result.error) {
                seterror1(result.error)
            }
            else {
                SendMail();
                setStyle1({ display: "block" });
                setsuccess("Enter OTP recieved on your email");
            }


        }

    }






    const actionHandler = async (event) => {
        if (UsernameData.length <= 0) {
            seterror("Invalid Username");
        }
        else {
            event.preventDefault();
            const formdata = {
                "username": UsernameData,
                "password": Password

            }

            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(formdata),
            });
            const result = await response.json();

            if (result.data) {
                localStorage.setItem('token', result.data.accessToken);
                localStorage.setItem('username', result.data.username);
                localStorage.setItem('email', result.data.email);
                if (!result.data.profession) {
                    localStorage.setItem('profession', null)
                }
                else {
                    localStorage.setItem('profession', result.data.profession)
                }
                SetUsername('');
                setPassword(' ');
                props.SetdisplayContent({
                    display: "block"
                })

                navigate("/general");


            }
            else {
                seterror(result.error);
            }
        }
    }

    const OTPChange = (event) => {
        SetOTP(event.target.value)
    }

    const Usernamechange = (event) => {
        SetUsername(event.target.value)
    }

    const Passwordchange = (event) => {
        setPassword(event.target.value)
    }

    const NewUserNameChange = (event) => {
        SetUserName1(event.target.value);
    }

    const NewEmailChange = (event) => {
        SetEmail(event.target.value);
    }

    const NewPasswordChange = (event) => {
        SetNewPassword(event.target.value);
    }

    const NewPassword1Change = (event) => {
        SetNewPassword1(event.target.value);
    }

    return (
        <div className='background'>
            <div className='topDiv centerized'>
                <h2 style={{ marginBottom: "1px" }}>DAILY-NEWS</h2>
                <h5 style={{ marginTop: "1px" }}>TOP HEADLINES OF THE WORLD</h5>

                <div className='loginpage centerized'>
                    <div><h5 className='header'>Login In Page</h5></div>
                    <div ><input onChange={Usernamechange} className='text' value={UsernameData} placeholder='Username' /></div>
                    <div ><input onChange={Passwordchange} className='text' value={Password} placeholder='Password' /></div>
                    <div><button onClick={actionHandler} className='SignBtn'>LOG IN</button></div>
                    <div className='bottom'>
                        <div>Create New Account</div>
                        <div><Link className='header' to="/">Register Now</Link></div>
                    </div>

                    <div><button onClick={openForm} className='header'>Forget Password?</button></div>
                    <div className='centerized'>
                        <div className='PopupForm PopupPassword centerized' style={sty} >
                            <div ><input className='text text2' onChange={NewUserNameChange} value={UserName} placeholder='Username' /></div>
                            <div ><input className='text text2' onChange={NewEmailChange} value={Email} placeholder='Email' /></div>
                            <div ><input className='text text2' onChange={NewPasswordChange} value={NewPassword} placeholder='New Password' style={InputStyle} /></div>
                            <div ><input className='text text2' onChange={NewPassword1Change} value={NewPassword1} placeholder='Confirm Password' style={InputStyle} /></div>
                            <div className='centerized'><input className='text text3' id="OtpId" onChange={OTPChange} value={OTPDetails} placeholder='Enter OTP' style={sty1} />
                                <img  onClick={Verify} src="./tick.png" className='Otpbtn' style={sty1}     />
                            </div>
                            <div className='centerized'>
                                <button onClick={ChangePassword} className='btn1' >SUBMIT</button>
                                <button onClick={closeForm} className='btn1' >Cancel</button>
                            </div>
                            <h6 style={{ color: "red", marginTop: "0px" }}>{error1}</h6>
                            <h6 style={{ color: "black", marginTop: "0px" }}>{success}</h6>
                        </div>
                    </div>

                    <div><h6 style={{ color: "red" }}>{error}</h6></div>

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

                        Myself Swaraj Dorge with the team Pratiksha,
                        Vishal, and Priyanka Dorge to provide you uptodate news.
                        Our mission is to deliver accurate, timely, and comprehensive news coverage to our readers. We strive to provide a platform that informs, educates, and engages users on a wide range of topics, including current events,
                        politics, business, technology, entertainment, sports, and more.
                        As an independent digital news publication, we are committed
                        to upholding the highest journalistic standards.
                        Our team of experienced journalists and reporters is dedicated
                        to thorough research, fact-checking, and unbiased reporting.
                        We aim to present news stories from multiple perspectives,
                        fostering a well-informed and inclusive discourse.
                    </h6>
                </div>
            </div>
        </div>

    )
}

export default Login