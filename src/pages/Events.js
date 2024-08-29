import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './styles/Events.css';
import Card from '../components/Card';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../database/storageConfig';
import { Link } from 'react-router-dom';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useSelector } from "react-redux";
    
function Events(){
    const [events, setEvents] = useState([]);
    const [category, setCategory] = useState('all');
    const userID = useSelector((state) => state.user.userID);

    useEffect(() => {
        const fetchProducts = async() => {
            const productCollection = collection(db, "events");
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

    const fetchProducts = async() => {
        const productCollection = collection(db, "events");
        const productSnapshot = await getDocs(productCollection);
        const productList = productSnapshot.docs.map(
            doc => ({
                id: doc.id,
                ...doc.data()
            })
        );
        setEvents(productList);
    };

    const handleCategory = async(e) => {
        const temp = e.target.value;
        setCategory(temp);
        const productCollection = collection(db, "events");
        if(temp === 'all'){
            fetchProducts();
        }
        else{
        const q = query(
                productCollection,
                where("category", "==", temp)
            );
        const productSnapshot2 = await getDocs(q);
        const productList = productSnapshot2.docs.map(
            doc => ({
                id: doc.id,
                ...doc.data()
            }))
        setEvents(productList);
        }
    }

    const handelDialogClose = () => {
        let dialog = document.getElementById('LoginDialog');
        dialog.close();
    }

    return(
        <div style={{position: "relative", boxSizing: "inherit", height: "333vh"}}>
            <Navbar/>
            <div id="MoisturizerContainer">
                <div id="MainPlateProducts">
                    <h1 id="TotalProductsCount" style={{opacity: "0"}}>---</h1>

                    <div id="CategoryDropdown1">
                        <p id="CategoryLabel">Category</p>
                        <select id="SortBySelect" size="1" value={category} onChange={handleCategory}>
                            <option value="all">All</option>
                            <option value="charity">Charity</option>
                            <option value="service">Service</option>
                            <option value="participation">Participation</option>
                            <option value="empowerment">Empowerment</option>
                        </select>
                    </div>
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
            <dialog id="LoginDialog">
                <button id="DialogClose" onClick={handelDialogClose}>x</button>
                <h1 style={{textAlign: "center", marginBottom: "0%"}}>Login or Sign Up to continue!</h1>
                <Link to='/SignIn'><button type="button" id="DialogSignInButton">Sign In</button></Link>
                <h1 style={{textAlign: "center", fontSize: "150%", fontWeight: "400", marginBottom: "0%"}}>New Here? Create an Account and get started!</h1>
                <Link to="/SignUp" id="DialogSignUpLink">Sign Up</Link>
            </dialog>
            <Footer />
        </div>
    )
}

export default Events;