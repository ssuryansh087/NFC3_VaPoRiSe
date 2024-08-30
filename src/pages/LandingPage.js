import React from "react";
import './styles/LandingPage.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import carousel1 from '../assets/Image1.png';
import carousel2 from '../assets/Image3.png';
import grouppic from '../assets/landing/grouppic.png';
import comm from '../assets/landing/comm.png';
import fund from '../assets/landing/fund.png';

function LandingPage() {
  return (
    <div style={{position: "relative", height: "320vh", backgroundColor: "black"}}>
        <Navbar/>
        <Carousel width={"100%"} autoPlay={true} showArrows={false} useKeyboardArrows={true} showStatus={false} showThumbs={false}>
          <div id='Carousel1'>
            <img src={carousel1} alt='Carousel 1' id='Carousel1Img'/>
            <p id="Carousel1Text">We make a living by what we get, but we make a life by what we give</p>
            <button id="Carousel1Btn">Donate Now</button>
          </div>
          <div id='Carousel2' style={{backgroundColor: "#61859B"}}>
            <img src={carousel2} alt='Carousel 2' id='Carousel2Img'/>
          </div>	
          {/* <div id='Carousel3'>
            <img src={carousel4} alt='Carousel 3' id='Carousel3Img'/>
          </div> */}
        </Carousel>
        <div className="floaters">
            <div className='Landing_division1'>
                <img className="imgleft" src={grouppic} alt="photo_1" />
             </div>
            <div className='Landing_division2'>
                 <p className='para_justify'>Events Lorem ipsum dolor fuga officiis voluptatibus laborum. Quas possimus, eius mollitia itaque accusantium reiciendis voluptatum.</p>
                 <button className="Landing_button">EVENTS</button>
            </div>
        </div>
        <div className="floaters" style={{flexDirection: "row-reverse"}}>
              <div className='Landing_division1'>
                  <img className="imgleft" src={comm} alt="photo_1" />
              </div>
              <div className='Landing_division2'>
                  <p className='para_justify'>Events Lorem ipsum dolor fuga officiis voluptatibus laborum. Quas possimus, eius mollitia itaque accusantium reiciendis voluptatum.</p>
                  <button className="Landing_button">COMMUNITY EVENTS</button>
              </div>
        </div>
        <div className="floaters">
              <div className='Landing_division1'>
                  <img className="imgleft" src={fund} alt="photo_1" />
              </div>
              <div className='Landing_division2'>
                  <p className='para_justify'>Events Lorem ipsum dolor fuga officiis voluptatibus laborum. Quas possimus, eius mollitia itaque accusantium reiciendis voluptatum.</p>
                  <button className="Landing_button">FUNDRAISERS</button>
              </div>
        </div>
        <Footer />
    </div>
  );
}

export default LandingPage;