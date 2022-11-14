import React, {useState, useMemo, useCallback, useRef} from "react";
import { GoogleMap, Marker, Autocomplete, InfoWindow, useLoadScript, DirectionsRenderer, Circle, MarkerClusterer } from "@react-google-maps/api";
import Places from "./Places";

// let LatLngLiteral = window.google.maps.LatLngLiteral;
// let DirectionsResult = window.google.maps.DirectionsResult;
// let MapOptions = window.google.maps.MapOptions;




export default function SearchMap(props) {
  const [selectedPoint, setSelectedPoint] = useState();
  const [startingPoint, setStartingPoint] = useState();
  const[markerPosition, setMarkerPosition] = useState(selectedPoint);
  const [map, setMap] = useState();
  const mapRef = useRef();
  const center =useMemo(() => ({lat:43, lng: -80}),[]);
  const onLoad = useCallback((map) => (mapRef.current = map, setMap(map)),[]);



// const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${selectedPoint.lat}%${selectedPoint.lng}&radius=5000&type=restaurant&keyword=cafe&key=AIzaSyDFuFtVTMN3kHm2IOr9oMW20l8HwvnhAEY`;

// fetch(url)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });


 function panToCenter() { map.panTo(selectedPoint);
                          setMarkerPosition(selectedPoint)}

 function panToStarting() { map.panTo(startingPoint);
                            setMarkerPosition(startingPoint)}

 function setStartingClick(){setStartingPoint(selectedPoint);
                              console.log(startingPoint)}

  
  const {isLoaded}= useLoadScript({
    googleMapsApiKey: "AIzaSyDFuFtVTMN3kHm2IOr9oMW20l8HwvnhAEY",
    libraries: ['places'],
 })

 


 if(!isLoaded) return <div>Loading...</div>

    return(
      <div className ="container">
          <div className = "controls">
            <Places 
            handleCenterClick = {panToCenter}
            handleStartingClick ={panToStarting} 
            setStartingPoint={setStartingClick}
            setSelectedPoint={(position) => {
              setSelectedPoint(position);
              mapRef.current?.panTo(position);
            }}
            setMarker={(position) => {
              setMarkerPosition(position);
            }
          }/>
          </div>
          <div className = "map">
          <GoogleMap 
          zoom={10} 
          center={center} 
          mapContainerClassName="map-container"
          onLoad = {onLoad}>

            <Marker position={markerPosition}/>
          
          </GoogleMap>
         
        
          </div>  
      </div>
    )
}