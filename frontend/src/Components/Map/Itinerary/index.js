import routeImg from '../../../assets/route.png'
import { useState } from 'react'

export default function Itinerary({ list, calculateRoute }) {


    const [viewList, setViewList] = useState(/** type @boolean */ false)

    function toggle(){
        setViewList(prevState => !prevState)
    }

    return (
        <div>{
            list.length>0 && 
            <span className='LandmarksListIcon'>
            <img src={routeImg} onClick={toggle} />
            {viewList &&
            <div className="places-rendered">
                <h1>These are your current destinations</h1>
                <ul>{list.map((place,key) => <li key={key}>{place}</li>)}</ul>
                
                <style>{`
                    .places-rendered{
                        outline: 9999px solid rgba(0,0,0,0.5);

                    }
                    `
                }</style>
                <button className="reset-button" onClick={calculateRoute}>Create Route</button>
            
                </div>
}
            
            <span className='LandmarksInRoute'>{list.length}</span>
            </span>
}
            
        </div>
    )

}