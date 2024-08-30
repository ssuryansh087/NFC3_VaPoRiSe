import React, { useEffect, useState } from "react";
import './styles/Navbar.css';
import logo from '../assets/Logo.png';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from 'firebase/auth';
import { clearUserID } from "../redux/userSlice";

function Navbar(){
    const userID = useSelector((state) => state.user.userID);
    const userType = useSelector((state) => state.user.userType);
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [myWhat, setMyWhat] = useState("My Account");
    const [toWhere, setToWhere] = useState("/profile");

    useEffect(() => {
        const changeData = () => {
            console.log(userType);
            if(userType === 1){
                setMyWhat("My Account");
                setToWhere("/profile");    
            }
            else if(userType === 2){
                setMyWhat("My NGO");
                setToWhere("/admindashboard");
            }
        }

        changeData();
    }, [userType])

    const handleLogout = async(e) => {
        e.preventDefault();
        try{
            await signOut(auth);
            dispatch(clearUserID());
            alert('Logged Out Successfully!');
            navigate('/');
        }
        catch(e){
            console.log("Error :", e);
        }
    }

    return(
        <div id="NavbarContainer">
            <img src={logo} alt="Work Hive Logo" id="NavbarLogo"/>
            <a href="/" id="NavbarLogoName">HumaNGO</a>
            <div id="NavbarLinksDiv">
            <Link to='/events' className="NavbarLinks">Events</Link>
            <a href="/" className="NavbarLinks">Projects</a>
            <Link to='/fundraisers' className="NavbarLinks">Fundraisers</Link>
            <a href="/" className="NavbarLinks">About Us</a>
            </div>

            <div id="LoginSignUpContainer">
                {!userID 
                && 
                <Link to="/login" id="LoginLink">Log In</Link>
                }
                {userID ?
                <div id="NewDropdown" style={{padding:"5px"}}>
                    <Link to={toWhere} id="NavbarMyWhat">{myWhat}</Link>
                    <div id='AccountDropdownContent'>
                        <Link to='/admindashboard'>DASHBOARD</Link>
                        <a href='/'>SETTINGS</a>  
                        {userID && <a href="/" id='LogOutNavbar' onClick={handleLogout}>LOG OUT</a>}
                    </div>
                </div>
                :
                <Link to="/signup" id="SignUpLink">Sign Up</Link>
                }
            </div>
        </div>
    )
}

export default Navbar;