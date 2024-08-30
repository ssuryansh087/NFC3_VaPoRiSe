import React from 'react';
import './styles/EventCard.css';
import { useNavigate } from 'react-router-dom';

function EventCard({event, eventName}){
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
                <p id='CardOrgName'>{event.orgName}</p>
                <button id='CardAddToCart'>Participate</button>
            </div>
        </div>
    )
}

export default EventCard;