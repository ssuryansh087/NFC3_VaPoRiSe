import React from "react";
import './styles/LandingPage.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import carousel1 from '../assets/Image1.png';
import carousel2 from '../assets/Image3.png';

function LandingPage() {
  return (
    <div style={{position: "relative", height: "130vh"}}>
        <Navbar/>
        <Carousel width={"100%"} autoPlay={true} showArrows={false} useKeyboardArrows={true} showStatus={false} showThumbs={false}>
          <div id='Carousel1'>
            <img src={carousel1} alt='Carousel 1' id='Carousel1Img'/>
            <p ></p>
          </div>
          <div id='Carousel2' style={{backgroundColor: "#61859B"}}>
            <img src={carousel2} alt='Carousel 2' id='Carousel2Img'/>
          </div>	
          {/* <div id='Carousel3'>
            <img src={carousel4} alt='Carousel 3' id='Carousel3Img'/>
          </div> */}
        </Carousel>
        <Footer />
    </div>
  );
}

export default LandingPage;