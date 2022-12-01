import React from "react"
import noImgAvail from '../../assets/image-not-available.png'

export default function Landmark(props) {


function handleClick(){
    props.setList(prev => [...prev, props.name])
    props.setListToCreateRoute(prev => [...prev, props.address])
}
    return (
        <div className="landmark-card">
            <img src= {props.pic!=null ? props.pic : noImgAvail} className="card-image" alt="Landmark Image"/>
            <p className="card-text">{props.name}</p>
            <p className="card-text">{props.address}</p>
            <p className="card-text">{props.type}</p>
            <p className="card-text">Landmark Description</p>
            <p className="card-text">{props.availability}</p>
            <div className="card-buttons">
                <button onClick={handleClick}>Add to Itinerary</button>
            </div>
        </div>
    )
}