import React, { useEffect, useState } from "react";
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

function NewEvent(){
    const [productImg, setProductImg] = useState(eventNull);
    const [prodImage, setProdImage] = useState(eventNull);
    const [eventName, setEventName] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventCateg, setEventCateg] = useState('charity');
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [hrSelect1, setHrSelect1] = useState("01");
    const [minsSelect1, setMinsSelect1] = useState("00");
    const [mSelect1, setMSelect1] = useState("AM");
    const [hrSelect2, setHrSelect2] = useState("01");
    const [minsSelect2, setMinsSelect2] = useState();
    const [mSelect2, setMSelect2] = useState("AM");
    const [eventTime, setEventTime] = useState();
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

    const handleDropdownChange = async(event) => {
        const selectedVal = event.target.value;
        setEventCateg(selectedVal);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const storageRef = ref(storage, `images/${prodImage.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, prodImage);
            const downloadURL = await getDownloadURL(snapshot.ref);

            const docRef = doc(db, "ngo", userID);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            const tempArray = data.events;
            tempArray.push(eventName);
            const orgName = data.orgName;

            await updateDoc(docRef, {
                events: tempArray
            })
            
            await setDoc(doc(db, "events", eventName), {
                imgURL: downloadURL,
                name: eventName,
                description: eventDesc,
                category: eventCateg,
                date: startDate,
                time: eventTime,
                location: location,
                orgName: orgName
              });
            setLoading(false);
            alert("Event Added Successfully!");
            window.location.reload();
        }
        catch(e){
            alert(e.message);
        }
    }

    useEffect(() => {
        const timeVal = () => {
            const temp = hrSelect1 + minsSelect1 + mSelect1 + hrSelect2 + minsSelect2 + mSelect2;
            setEventTime(temp);
        }

        timeVal();
    })

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
                  <h1 id="UploadProductImage">Upload Event Image</h1>
                  <h1 id="AddImagePlus">+</h1>
              </div>
              <div id="AdminAddProductDetailsDiv">
                  <h1 id="AddProductDetailsHeader">Add Event Details</h1>
                  
                  <p id="AddProductDetailsNameLabel">Event Name</p>
                  <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Enter Event Name..." id="AddProductDetailsName"/>

                  <p id="AddProductDetailsCatLabel">Event Category</p>
                  <select id="CategorySelect" size="1" value={eventCateg} onChange={handleDropdownChange}>
                    <option value="charity">Charity</option>
                    <option value="service">Service</option>
                    <option value="participation">Participation</option>
                    <option value="empowerment">Empowerment</option>
                  </select>

                  <p id="AddProductDetailsDescLabel">Event Description</p>
                  <textarea value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} placeholder="Enter Event Description..." rows={5} id="AddProductDetailsDesc"/>

                  <p id="EventBookingDate">Event Date : <DatePicker id="DatePicker1" selected={startDate} onChange={(date) => setStartDate(date)} /></p>

                  <p id="EventBookingTime">Event Time : </p>

                  <div id="TimeSelectMenus">
                    <div id="TimeStarting">
                        <select id="HourSelect1" className="allSelects" value={hrSelect1} onChange={(e) => setHrSelect1(e.target.value)}>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <select id="MinuteSelect1" className="allSelects" value={minsSelect1} onChange={(e) => setMinsSelect1(e.target.value)}>
                            <option value="00">00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                        </select>
                        <select id="AMPMSelect1" className="allSelects" value={mSelect1} onChange={(e) => setMSelect1(e.target.value)}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                    <p style={{fontSize: "200%", margin: "0px", marginLeft: "10px"}}>TO</p>
                    <div id="TimeEnding">
                        <select id="HourSelect2" className="allSelects" value={hrSelect2} onChange={(e) => setHrSelect2(e.target.value)}>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <select id="MinuteSelect2" className="allSelects" value={minsSelect2} onChange={(e) => setMinsSelect2(e.target.value)}>
                            <option value="00">00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                        </select>
                        <select id="AMPMSelect2" className="allSelects" value={mSelect2} onChange={(e) => setMSelect2(e.target.value)}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                    </div>
                
                    <p id="EventBookingLocation">Event Location : {location[0].toPrecision(7)}, {location[1].toPrecision(7)} </p>
                
                    <MapContainer center={location} zoom={13} style={{ height: '25%', width: '30%' }} id="AdminMap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                    </MapContainer>

                  <button id="AddProductButton" type="submit">Add Event</button>
              </div>
              {loading && <div style={loaderStyle}></div>}
            </div>
            </form>
            <Footer />
        </div>
    )
}

export default NewEvent;