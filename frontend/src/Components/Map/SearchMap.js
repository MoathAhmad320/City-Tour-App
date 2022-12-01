import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap, Marker, useLoadScript, DirectionsRenderer
  // , Autocomplete, InfoWindow, , Circle, MarkerClusterer 
} from "@react-google-maps/api";
import Places from "./Places";
import NearByPlaces from "./NearByPlaces/NearByPlaces";


// let LatLngLiteral = window.google.maps.LatLngLiteral;
// let DirectionsResult = window.google.maps.DirectionsResult;
// let MapOptions = window.google.maps.MapOptions;

export default function SearchMap(props) {

  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState()

  const [selectedPoint, setSelectedPoint] = useState();
  const [startingPoint, setStartingPoint] = useState();
  const [markerPosition, setMarkerPosition] = useState(selectedPoint);
  const [map, setMap] = useState();
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: latitude, lng: longitude }), [longitude]);
  const onLoad = useCallback((map) => (mapRef.current = map, setMap(map)), []);

  const API_BASE = "http://localhost:8081/";
  const API_ITINERARY = 'itineraries/'
  const API_LANDMARKS = 'landmarks/'

  const [directionsResponse, setDirectionsResponse] = React.useState(null)
  const [itineraryId, setItineraryId] = useState(null);
  const [addresses, setAddresses] = useState([]);

  function sendItinerary(date, startingLandmarkId) {
    let itineraryObject = {
                         date:date,
                         userId:'1',
                         startingLandmarkId: startingLandmarkId
                             }

     if(itineraryId === null){
     const requestOptions = {
       method:'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(itineraryObject)
     };
 
     let returnId = fetch(API_BASE + API_ITINERARY, requestOptions)
       .then(res => res.json())
       .then(setItineraryId(returnId))
       }

     else{
        itineraryObject = {
          date:date,
          userId:null,
          startingLandmarkId:startingLandmarkId
                         }

             const requestOptions = {
               method:'PUT',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(itineraryObject)
             };
         
             fetch(API_BASE + API_LANDMARKS + itineraryId, requestOptions)
               .then(res => res.json())
     }
     }
     
     function getLandmarks(itineraryId){
      fetch(API_BASE + API_LANDMARKS + itineraryId)
      .then(res => res.json())
      .then(landmarks => {
        setAddresses((current) => [...current, {location: landmarks.address}])
      }
  );
  }

  let start;
  let end;
  let addressArray;
    function handleAddress(){
      let lastIndex = addresses.length() -1;
      end = addresses[lastIndex];
      start = addresses.shift();
      setAddresses(addresses.pop())
    }



     async function calculateRoute(){
      //eslint-disable-next-line no-undef
      const directionService = new google.maps.DirectionsService();
      const results = await directionService.route({
          origin:start,
          destination:end,
          waypoints: addresses,
          //eslint-disable-next-line no-undef
          travelMode:google.maps.TravelMode.DRIVING,
         
      })
      setDirectionsResponse(results)
  }

  //Setting map to user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
    });
  })

  function panToCenter() {
    map.panTo(selectedPoint);
    setMarkerPosition(selectedPoint)
  }

  function panToStarting() {
    map.panTo(startingPoint);
    setMarkerPosition(startingPoint)
  }

  function setStartingClick() {
    setStartingPoint(selectedPoint);
    console.log(startingPoint)
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDFuFtVTMN3kHm2IOr9oMW20l8HwvnhAEY",
    libraries: ['places'],
  })


  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="container">
              {/* <NearByPlaces map={map} /> */}
             
      <div className="controls">
        <Places
        map={map}
          handleCenterClick={panToCenter}
          handleStartingClick={panToStarting}
          setStartingPoint={setStartingClick}
          setSelectedPoint={(position) => {
            setSelectedPoint(position);
            mapRef.current?.panTo(position);
          }}
          setMarker={(position) => {
            setMarkerPosition(position);
          }
          } 
          sendItinerary = {(date, startingLandmarkId) =>(sendItinerary(date, startingLandmarkId))}
          itineraryId = {itineraryId}
          />
           <button className = "reset-button" onClick = {calculateRoute}>Create Route</button>
      </div>
      
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          onLoad={onLoad}>

          <Marker position={markerPosition} />
          {directionsResponse && <DirectionsRenderer directions = {directionsResponse}/>}
        </GoogleMap>

      </div>
    </div>
  )
}