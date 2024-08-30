import React,{useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import './styles/Event.css';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../database/storageConfig';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

function Product(){
    const [mainImg, setMainImg] = useState();
    const [name, setName] = useState('BelleZa Product');
    const [desc, setDesc] = useState('Product Description.');
    const { eventName } = useParams();
    const [eventLocation, setEventLocation] = useState([19.064621857915913, 72.835849467775]);

    console.log(eventName);
    
    useEffect(()=>{
        const retrieveData = async() => {
            const docRef = doc(db, "events", eventName)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists){
                const data = docSnap.data();
                setMainImg(data.imgURL);
                setName(data.name);
                setDesc(data.description);
                setEventLocation({ lat: data.location[0], lng: data.location[1] })
            }
            else{
                alert("Database error!!");
            }
        }
        retrieveData();
    },[eventName]);

    const LocationMarker = () => {
        useMapEvents({
        click(e) {
            setEventLocation([e.latlng.lat, e.latlng.lng]);
        },
        });
        return eventLocation === null ? null : <Marker position={eventLocation} icon={L.icon({
            iconUrl: markerIconPng,
            shadowUrl: markerShadowPng,
          })} />;
    };

    return(
            <div className="product">
            <Navbar/>
            <div className="cleanser_prod">
                <div className='bigpic'>
                    <img className="prodpic" src={mainImg} alt='Main'></img>
                </div>
                <div className='desc'>
                    <p className='prod_name'>{name}</p>
                    <p className='prod_desc'>{desc}</p>
                    <button className='add_to_cart'>PARTICIPATE</button>
                    </div>
                </div>

                <div id='EventMap'>
                    <MapContainer center={eventLocation} zoom={9} style={{ height: '500px', width: '64%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationMarker />
                    </MapContainer>
                </div>
                <Footer />
            </div>
    )
}
export default Product;