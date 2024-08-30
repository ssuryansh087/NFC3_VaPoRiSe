import React, { useState } from "react";
import './styles/NewEvent.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import eventNull from "../assets/events/eventNull.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { storage, db } from '../database/storageConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import L from 'leaflet';
import { useSelector } from "react-redux";

function NewFundraiser(){
    const [productImg, setProductImg] = useState(eventNull);
    const [prodImage, setProdImage] = useState(eventNull);
    const [fundName, setFundName] = useState('');
    const [fundDesc, setFundDesc] = useState('');
    const [fundGoal, setFundGoal] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState([19.064621857915913, 72.835849467775]);
    const userID = useSelector((state) => state.user.userID);

    const loaderStyle = {
        position: "absolute",
        top: "35%",
        left: "68%",
        border: '16px solid #f3f3f3', 
        borderTop: '16px solid #171717',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 2s linear infinite',
        margin: '20px auto',
        boxShadow: '0px 0px 30px 20px rgb(0, 0, 0, 0.25)',
        backgroundColor: 'rgb(0, 0, 0, 0.25)'
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(event.target.files[0]){
          setProdImage(event.target.files[0]);
          console.log(prodImage.name);
        }
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProductImg(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const storageRef = ref(storage, `images/${prodImage.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, prodImage);
            const downloadURL = await getDownloadURL(snapshot.ref);

            const docRef = doc(db, "ngo", userID);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            const tempArray = data.fundraisers;
            tempArray.push(fundName);
            const orgName = data.orgName;

            await updateDoc(docRef, {
                fundraisers: tempArray
            })
            
            await setDoc(doc(db, "fundraisers", fundName), {
                imgURL: downloadURL,
                name: fundName,
                description: fundDesc,
                fundGoal: fundGoal,
                startDate: startDate,
                endDate: endDate,
                location: location,
                orgName: orgName
              });
            setLoading(false);
            alert("Fundraiser Added Successfully!");
            window.location.reload();
        }
        catch(e){
            alert(e.message);
        }
    }

    const LocationMarker = () => {
        useMapEvents({
        click(e) {
            setLocation([e.latlng.lat, e.latlng.lng]);
        },
        });
        return location === null ? null : <Marker position={location} icon={L.icon({
            iconUrl: markerIconPng,
            shadowUrl: markerShadowPng,
          })} />;
    };

    return(
        <div style={{position: "relative", height: "130vh"}}>
            <Navbar />
            <form onSubmit={handleSubmit}>
            <div style={{display: "flex"}}>
              <div id="AdminAddImageDiv">
                  <img src={productImg} id="ProductNull" alt="Product Null"/>
                  <input type="file" name="Product Image" id="AdminImageSelect" onChange={handleImageChange} accept="image/png, image/jpeg, image/jpg"/>
                  <h1 id="UploadProductImage">Upload Fundraiser Image</h1>
                  <h1 id="AddImagePlus">+</h1>
              </div>
              <div id="AdminAddProductDetailsDiv">
                  <h1 id="AddProductDetailsHeader">Add Fundraiser Details</h1>
                  
                  <p id="AddProductDetailsNameLabel">Fundraiser Name</p>
                  <input type="text" value={fundName} onChange={(e) => setFundName(e.target.value)} placeholder="Enter Fundraiser Name..." id="AddProductDetailsName"/>

                  <p id="AddProductDetailsNameLabel">Fundraiser Goal</p>
                  <input type="number" min={1000} max={10000000} step={500} value={fundGoal} onChange={(e) => setFundGoal(e.target.value)} placeholder="Enter Fundraiser Goal..." id="AddProductDetailsName"/>

                  <p id="AddProductDetailsDescLabel">Fundraiser Description</p>
                  <textarea value={fundDesc} onChange={(e) => setFundDesc(e.target.value)} placeholder="Enter Fundraiser Description..." rows={5} id="AddProductDetailsDesc"/>

                  <p id="EventBookingDate">Start Date : <DatePicker id="DatePicker1" selected={startDate} onChange={(date) => setStartDate(date)} /></p>

                  <p id="EventBookingDate">End Date : <DatePicker id="DatePicker1" selected={endDate} onChange={(date) => setEndDate(date)} /></p>


                  <p id="EventBookingLocation">In-Person Location : {location[0].toPrecision(7)}, {location[1].toPrecision(7)} </p>
                
                    <MapContainer center={location} zoom={13} style={{ height: '25%', width: '30%' }} id="AdminMap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                    </MapContainer>

                    <button id="AddProductButton" type="submit" style={{marginTop: "8%"}}>Add Fundraiser</button>
              {loading && <div style={loaderStyle}></div>}
            </div>
            </div>
            </form>
            <Footer />
        </div>
    )
}

export default NewFundraiser;