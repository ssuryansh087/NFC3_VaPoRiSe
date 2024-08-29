import React, { useEffect, useState } from "react";
import './styles/AdminDashboard.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import userProf from '../assets/userProf.png';
import { storage, db } from '../database/storageConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AdminDashboard(){
    const [selectedImage, setSelectedImage] = useState(userProf);
    const [prodImage, setProdImage] = useState(userProf);
    const userID = useSelector((state) => state.user.userID);
    const [name, setName] = useState("Non-Governmental Organization");
    
    const handleImageChange = async(event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if(event.target.files[0]){
            setProdImage(event.target.files[0]);
        }
         if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
            setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
        }

        const storageRef = ref(storage, `logos/${prodImage.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, prodImage);
            const downloadURL = await getDownloadURL(snapshot.ref);
            const docRef = doc(db, "ngo", userID);
            await updateDoc(docRef, {
                logoURL: downloadURL
            });
        }catch(e){
            console.error(e);
        }
    };

    useEffect(() => {
        const fetchName = async(e) => {
            try{
            const tempRef = doc(db, "ngo", userID);
            const docSnap = await getDoc(tempRef);

            const data = docSnap.data(); 
            setName(data.orgName);
            } catch(e){
                console.log(e);
            }
        }
        fetchName();
    }, [userID])
    
    return(
        <div style={{position: "relative", height: "126vh"}}>
            <Navbar />
            <div className='profile'>
            <div className='profile_pic1'>
                    <img 
                        className="user" 
                        src={selectedImage} 
                        alt="User Profile" 
                        id="DashboardImg"
                        accept="image/png, image/jpeg, image/jpg"
                    />
                    <input type="file" id="myFile" name="filename" onChange={handleImageChange} />
                    <p id="DashboardName">{name}</p>
            </div>

            <div className='profile_pic2'>
                <div className='event_btns'>
                <button className='new_event'><h4 className = "new_eventh4"><Link to='/newevent' style={{textDecoration: "none", color: "black"}}>Create New Event</Link></h4></button>
                <button className='new_event'><h4 className = "new_eventh4">Your Events</h4></button>
                <button className='new_event'><h4 className = "new_eventh4"><Link to='/newfundraiser' style={{textDecoration: "none", color: "black"}}>Create New Fundraiser</Link></h4></button>
                <button className='new_event'><h4 className = "new_eventh4">Your Fundraisers</h4></button>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminDashboard;