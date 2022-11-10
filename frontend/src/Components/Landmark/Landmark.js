import React from "react"

export default function Landmark(props) {


    return (
        <div className="landmark-card">
            <img src=".\logo512.png" className="card-image" />
            <p className="card-text">Landmark Name</p>
            <p className="card-text">Landmark Address</p>
            <p className="card-text">Landmark Type</p>
            <p className="card-text">Landmark Description</p>
            <p className="card-text">Landmark Availability</p>
            <div className="card-buttons">
                <button>Set As Starting Point</button>
                <button>Add to Itinerary</button>
            </div>
        </div>
    )
}