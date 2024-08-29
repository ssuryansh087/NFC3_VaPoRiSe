import React from 'react';
import './styles/Card.css';
import { useSelector } from 'react-redux';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../database/storageConfig';
import { useNavigate } from 'react-router-dom';

function Card({event, eventName}){
    const userID = useSelector((state) => state.user.userID);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/event/${eventName}`);
    }
    
    return(
        <div id='Card' onClick={handleClick}>
            <div id='CardMain'>
                <img src={event.imgURL} alt='' id='CardPrimaryImage'/>
                <p id='CardProductPrice'>{event.name}</p>
            </div>
            <div id='CardDescDiv'>
                <button id='CardAddToCart'>Participate</button>
            </div>
        </div>
    )
}

export default Card;