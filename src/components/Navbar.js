import React from "react";
import './styles/Navbar.css';
import logo from '../assets/Logo.png';
import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div id="NavbarContainer">
            <img src={logo} alt="Work Hive Logo" id="NavbarLogo"/>
            <a href="/" id="NavbarLogoName">HumaNGO</a>
            <div id="NavbarLinksDiv">
            <a href="/" className="NavbarLinks">Events</a>
            <a href="/" className="NavbarLinks">Projects</a>
            <a href="/" className="NavbarLinks">Fundraisers</a>
            <a href="/" className="NavbarLinks">About Us</a>
            </div>

            <div id="LoginSignUpContainer">
                <Link to="/login" id="LoginLink">Log In</Link>
                <Link to="/signup" id="SignUpLink">Sign Up</Link>
            </div>
        </div>
    )
}

export default Navbar;