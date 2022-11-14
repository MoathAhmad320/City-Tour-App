import React from "react"

export default function Landmark(props) {


    return (
        <div className="landmark-card">
            <img src= {`${props.pic}`} className="card-image" alt="Landmark Image"/>
            <p className="card-text">{props.name}</p>
            <p className="card-text">{props.address}</p>
            <p className="card-text">{props.type}</p>
            <p className="card-text">Landmark Description</p>
            <p className="card-text">{props.availability}</p>
            <div className="card-buttons">
                <button>Add to Itinerary</button>
            </div>
        </div>
    )
}