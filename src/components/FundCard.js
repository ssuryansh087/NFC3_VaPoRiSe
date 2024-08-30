import React from 'react';
import './styles/FundCard.css';
import { useNavigate } from 'react-router-dom';

function FundCard({event, eventName}){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/fundraisers`);
    }
    
    return(
        <div id='Card' onClick={handleClick}>
            <div id='CardMain'>
                <img src={event.imgURL} alt='' id='CardPrimaryImage'/>
                <p id='CardProductPrice'>{event.name}</p>
            </div>
            
            <div id='CardDescDiv'>
                <p id='CardOrgName1'>{event.orgName}</p>
                <p id='CardGoal'>Goal : ₹ {event.fundGoal}</p>
                <button id='CardAddToCart'>Donate</button>
            </div>
        </div>
    )
}

export default FundCard;