
import React from 'react'
import DropMenu from './DropMenu'
import Landmark from "../Landmark/Landmark";
import LandmarkStatus from "../Landmark/LandmarkStatus"
export default function MyTrips(){
    const API_BASE = "http://localhost:8081/";
    const API_ITINERARY = 'itineraries/'
    const API_LANDMARKS = 'landmarks/'


    
    const [current, setCurrent] = React.useState(null)
    const [ready, setReady] = React.useState(false)
    const [collection, setCollection] = React.useState([{
                                                        id: 1,
                                                        name: "joe"
                                                        },
                                                        {
                                                        id: 2,
                                                        name: "joe1",
                                                        },
                                                        {
                                                        id: 3,
                                                        name: "joe2"
                                                        }])
    
    // function getItineraries(){
    //     fetch(API_BASE + API_ITINERARY + USER_ID)
    //     .then(res => res.json())
    //     .then(itineraries => {
    //         setCollection(itineraries);
    //     }
    // );
    // }

  



    function getLandmarks(itineraryId){
        fetch(API_BASE + API_LANDMARKS + itineraryId)
        .then(res => res.json())
        .then(landmarks => {
            setCurrent(landmarks);
            setReady(!ready);
        }
    );
    }

    React.useEffect((getLandmarks), [])
// getItineraries

let header;
if(current != null){
header = <div>{current}</div>
}

let landmarks;
if(ready){
    landmarks = current.map((landmark) => 
                            <div>
                            <Landmark 
                            id = {landmark.id}
                            name = {landmark.name} 
                            address = {landmark.address} 
                            type ={landmark.type}
                            pic = {landmark.pic}
                            availability = {landmark.availability}
                            />
                            <LandmarkStatus id = {landmark.id} />
                            </div> )
}


    return(
    <div className='trips-outer-container'>

        <div className = 'trips-header'>
            <h1>Your Routes</h1>
                {header}
                <DropMenu collection = {collection} setCurrent = {setCurrent} getLandmarks = {getLandmarks}/>
        </div>

        <div className='trips-inner-container'>
                    
            <div className = 'directions-outer-container'>
                <div className = 'directions-inner-container'>
                    <p>Written Directions</p> 
                </div>
        
                <div className = 'directions-map-container'>
                    <p>MAP HERE</p>
                </div>

                <div className = 'places-outer-container'>
                    <p>Places in route</p>
                    <div className = 'places-inner-container'>
                        {landmarks}
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}







