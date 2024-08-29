import React, { useState, useRef } from "react";
import './styles/Login.css';
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import logo from '../assets/Logo.png';
import Footer from "../components/Footer";

function Login(){
    let [buttonText, setButtonText] = useState('Show');
    const [showPassword, setShowPassword] = useState(false);
    const [selected, setSelected] = useState(1);
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const divRef = useRef(null);
    const btn1Ref = useRef(null);
    const btn2Ref = useRef(null);
    const [text1, setText1] = useState("Create a HumaNGO Account to make a meaningful impact:");
    const [p1, setP1] = useState("-Join Community Events and Initiatives");
    const [p2, setP2] = useState("-Explore Volunteer Opportunities");
    const [p3, setP3] = useState("-Easily Make Donations and Track Contributions");
    const [p4, setP4] = useState("-Stay Connected with the Latest Updates");

    const HandleClick = () =>{
        setButtonText(showPassword === true ? 'Show' : 'Hide');
        setShowPassword((prev) => !prev);
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = (val) => {
        if(val === 1){
            if(selected !== 1){
                setSelected(1);
                input1Ref.current.style.backgroundColor = '#77cbb9';
                input2Ref.current.style.backgroundColor = '#77cbb9';
                divRef.current.style.backgroundColor = '#77cbb9';
                btn1Ref.current.style.backgroundColor = '#77cbb9';
                btn1Ref.current.style.color = '#171717';
                btn2Ref.current.style.backgroundColor = '#f8fbef';
                btn2Ref.current.style.color = '#171717';
                const btn = document.getElementById('SignUpLink');
                btn.style.backgroundColor = '#77cbb9';
                setText1("Create a HumaNGO Account to make a meaningful impact:");
                setP1("-Join Community Events and Initiatives");
                setP2("-Explore Volunteer Opportunities");
                setP3("-Easily Make Donations and Track Contributions");
                setP4("-Stay Connected with the Latest Updates");
            }
            
        }
        else if(val === 2){
            if(selected !== 2){
                setSelected(2);
                input1Ref.current.style.backgroundColor = '#DDDDF8';
                input2Ref.current.style.backgroundColor = '#DDDDF8';
                divRef.current.style.backgroundColor = '#DDDDF8';
                btn1Ref.current.style.backgroundColor = '#f8fbef';
                btn1Ref.current.style.color = '#2d2d34';
                btn2Ref.current.style.backgroundColor = '#DDDDF8';
                btn2Ref.current.style.color = '#171717';
                const btn = document.getElementById('SignUpLink');
                btn.style.backgroundColor = '#DDDDF8';
                setText1("Create a HumaNGO Account and unlock exclusive tools:");
                setP1("-Manage Your Projects and Events with Ease");
                setP2("-Launch and Track Fundraising Campaigns");
                setP3("-Connect with Volunteers and Donors");
                setP4("-Stay Informed with Real-Time Updates and Analytics");
            }
            
        }
    }

    return(
        <div id="SignInDiv">
            <Navbar />
            <div>
                <div>
                    <div className='leftContainer'>

                        <div id="LoginSwitcher">
                            <button ref={btn1Ref} id="SwitchF" onClick={() => handleClick(1)}>User</button>
                            <button ref={btn2Ref} id="SwitchE" onClick={() => handleClick(2)}>NGO</button>
                        </div>

                        <h1 id='loginText'>Login to Your Account</h1>
        
                    <form>
                        <div id='usernameID'>
                            <input ref={input1Ref} type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} name='username' required
                            id='usernameInput'/>
                        </div>
            
                        <div id='passwordID'>
                            <input ref={input2Ref} type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} maxLength="16" placeholder='Password' name='password' required
                            id='passwordInput'/>
                            <button type='button' className='toggleButton' onClick={HandleClick}>{buttonText}</button>
                        </div>

                        <button type='submit' id='submitButton'>Sign In</button>
                    </form>
                    </div>

                    <div className='rightContainer' ref={divRef}>
                        <img src={logo} id='LoginLogo' alt='Logo'/>
                        <h1 id='newHere'>New Here?</h1>
                        <p id='SignUpText'>{text1}</p>
                        <p className='offers'>{p1}</p>
                        <p className='offers'>{p2}</p>
                        <p className='offers'>{p3}</p>
                        <p className='offers'>{p4}</p>
                        <Link to='/signup'><button type='submit' id='signUpButton'>Sign Up</button></Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login;