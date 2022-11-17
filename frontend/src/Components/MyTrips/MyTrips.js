
import React from 'react'

export default function MyTrips(){

    return(
    <div className='trips-outer-container'>
        <div className = 'trips-header'>
        <h1>Your Routes</h1>
            <form>
                <input type = "text" placeholder='Dropdown Menu Holder'></input>
            </form>
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
            Places in route
            <div className = 'places-inner-container'>
                Box of directions 
            </div>
        </div>
        </div>
        </div>
    </div>
    )
}







