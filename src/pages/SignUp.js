import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './styles/SignUp.css';
import { Link } from "react-router-dom";
import logo from '../assets/Logo.png';
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import firebase from '../database/firebaseConfig.js';
import 'firebase/compat/firestore';
import { useDispatch } from "react-redux";
import { setUserID, setUserType } from "../redux/userSlice.js";

function SignUp(){
    let [buttonText, setButtonText] = useState('Show');
    const [password, setPassword] = useState("");
    const [place, setPlace] = useState("Name");
    const [showPassword, setShowPassword] = useState(false);
    const [selected, setSelected] = useState(1);
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const divRef = useRef(null);
    const btn1Ref = useRef(null);
    const btn2Ref = useRef(null);
    const [p1, setP1] = useState("-Discover Volunteer Opportunities Tailored to You");
    const [p2, setP2] = useState("-Make Donations That Truly Make a Difference");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userType2, setUserType2] = useState(1);

    const HandleClick = () =>{
        setButtonText(showPassword === true ? 'Show' : 'Hide');
        setShowPassword((prev) => !prev)
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleClick = (val) => {
        if(val === 1){
            if(selected !== 1){
                setSelected(1);
                input1Ref.current.style.backgroundColor = '#77cbb9';
                input2Ref.current.style.backgroundColor = '#77cbb9';
                input3Ref.current.style.backgroundColor = '#77cbb9';
                divRef.current.style.backgroundColor = '#77cbb9';
                btn1Ref.current.style.backgroundColor = '#77cbb9';
                btn1Ref.current.style.color = '#171717';
                btn2Ref.current.style.backgroundColor = '#f8fbef';
                btn2Ref.current.style.color = '#171717';
                const btn = document.getElementById('SignUpLink');
                btn.style.backgroundColor = '#77cbb9';
                setP1("-Discover Volunteer Opportunities Tailored to You");
                setP2("-Make Donations That Truly Make a Difference");
                setPlace("Name");
            }
            setUserType2(1);
        }
        else if(val === 2){
            if(selected !== 2){
                setSelected(2);
                input1Ref.current.style.backgroundColor = '#DDDDF8';
                input2Ref.current.style.backgroundColor = '#DDDDF8';
                input3Ref.current.style.backgroundColor = '#DDDDF8';
                divRef.current.style.backgroundColor = '#DDDDF8';
                btn1Ref.current.style.backgroundColor = '#f8fbef';
                btn1Ref.current.style.color = '#2d2d34';
                btn2Ref.current.style.backgroundColor = '#DDDDF8';
                btn2Ref.current.style.color = '#171717';
                const btn = document.getElementById('SignUpLink');
                btn.style.backgroundColor = '#DDDDF8';
                setP1("-Manage Your Projects and Fundraisers Effectively");
                setP2("-Connect with Volunteers and Donors");
                setPlace("Organization Name");
            }
            setUserType2(2);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
  
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            alert("Account Created Successfully!")
            navigate('/');
            const uid = userCredential.user.uid;
            const events = [];
            const fundraisers = [];
            const orgName = name;
            
            if(userType2 === 1){
                await firebase.firestore().collection('users').doc(uid).set({
                    name,
                    email
                });
            }
            else{
                await firebase.firestore().collection('ngo').doc(uid).set({
                    orgName,
                    email,
                    events,
                    fundraisers
                });
            }
            dispatch(setUserID(uid));
            dispatch(setUserType(userType2));
        } catch (error) {
          console.log(error.message);
        }
      };
  
    return(
        <div id="SignUpDiv">
        <Navbar/>
        <div>
            <div className='leftContainer2' ref={divRef}>
            <img src={logo} id='Logo2' alt='Logo'/>
            <h1 id='newHere2'>Already a Member?</h1>
            <p id='SignUpText2'>Sign In to HumaNGO!</p>
            <p className='offers2'>{p1}</p>
            <p className='offers2'>{p2}</p>
            <p className='offers2'>& Much More!</p>
            <Link to='/login'><button type='submit' id='signUpButton2'>Sign In</button></Link>
        </div>

        <div className='rightContainer2'>

            <div id="LoginSwitcher2">
                <button ref={btn1Ref} id="SwitchF" onClick={() => handleClick(1)}>User</button>
                <button ref={btn2Ref} id="SwitchE" onClick={() => handleClick(2)}>NGO</button>
            </div>

            <h1 id='loginText2'>Create Account</h1>
      
            <form onSubmit={handleRegister}>
                <div id='nameID2'>
                    <input ref={input1Ref} type='text' placeholder={place} value={name} onChange={(e) => setName(e.target.value)} name='name' required
                    id='nameInput2'/>
                </div>
    
                <div id='usernameID2'>
                    <input ref={input2Ref} type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} name='username' required
                    id='usernameInput2'/>
                </div>
        
                <div id='passwordID'>
                    <input ref={input3Ref} type={showPassword ? 'text' : 'password'}  placeholder='Password' name='password' required
                        id='passwordInput2' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type='button' className='toggleButton' onClick={HandleClick}>{buttonText}</button>
                </div>

                <button type='submit' id='submitButton2'>Sign Up</button>
                </form>
            </div>
        </div>
        <Footer />
        </div>
    )
}

export default SignUp;