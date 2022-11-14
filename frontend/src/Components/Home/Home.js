import {Link} from 'react-router-dom'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {GoogleMap,
     Marker, 
     useJsApiLoader,  
     Autocomplete,
    DirectionsRenderer} from "@react-google-maps/api";
import React from 'react';
import Landmark from '../Landmark/Landmark';
import SearchMap from '../Map/SearchMap';
import Header from '../Header/Header';




function Home(props) {

    return(

        // <div className = "home-page">
        //     <div className='search-section'>
                <div>
                 
                    <div className = "info-panel">
                     <SearchMap/>   
                    </div>
                    
                </div>
        //     <div className = "map-holder">
               
        // </div>
        // </div>


        // <div className = "map-list">

        // </div>
        // </div>
    )
}

export default Home;