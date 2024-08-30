import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './styles/Events.css';
import Card from '../components/FundCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/storageConfig';
import { Link } from 'react-router-dom';
    
function Fundraisers(){
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
            const productCollection = collection(db, "fundraisers");
            const productSnapshot = await getDocs(productCollection);
            const productList = productSnapshot.docs.map(
                doc => ({
                    id: doc.id,
                    ...doc.data()
                })
            );
            setEvents(productList);
        };

        fetchProducts();
    }, []);

    return(
        <div style={{position: "relative", boxSizing: "inherit", height: "164vh"}}>
            <Navbar/>
            <div id="MoisturizerContainer">
                <div id="MainPlateProducts">
                    <h1 id="TotalProductsCount" style={{opacity: "0"}}>---</h1>

                    <div id="ProductsList">
                    {events.map(event => (
                        <Card 
                        key={event.id} 
                        event={event}
                        eventName={event.name}
                        />
                    ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Fundraisers;