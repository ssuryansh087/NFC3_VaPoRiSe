import React,{useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import './styles/Event.css';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../database/storageConfig';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

function Product(){
    const [mainImg, setMainImg] = useState();
    const [name, setName] = useState('BelleZa Product');
    const [desc, setDesc] = useState('Product Description.');
    const { eventName } = useParams();

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
            }
            else{
                alert("Database error!!");
            }
        }
        retrieveData();
    },[eventName])

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
                <Footer />
            </div>
    )
}
export default Product;