import usePlacesAutocomplete, {getGeocode, getLatLng, getDetails} from "use-places-autocomplete"
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from '@reach/combobox'
import "@reach/combobox/styles.css"
import Landmark from "../Landmark/Landmark";
import { useState } from "react";
import ToggleSwitch from '../ToggleSwitch/ToggleSwtich';
import DatePicker from "react-datepicker"
import NearByPlaces from "./NearByPlaces/NearByPlaces";
import LandmarkStatus from "../Landmark/LandmarkStatus"

export default function Places(props){
    const [landmarkName, setLandmarkName] = useState();
    const [landmarkType, setLandmarkType] = useState();
    const [landmarkAddress, setlandmarkAddress] = useState();
    const [landmarkPic, setLandmarkPic] = useState();
    const [landmarkDescription, setLandmarkDescription] = useState();
    const [landmarkAvailability, setLandmarkAvailability] = useState();
    const [selectedValue, setSelectedValue] = useState();
    
    const [date, setDate] = useState(new Date());


    const[currentItin, setCurrentItin] = useState(null)
    const [landmarkId, setLandmarkId] = useState(null)
    const [renderLandmark, setRenderLandmark] = useState(false)
    const API_BASE = "http://localhost:8080/";
    const API_LANDMARKS = '/landmarks/'

    //does put or post depending on if it exists
    function sendLandmark() {
        let landmarkObject = {
                             image:null,
                             name:null,
                             address:null,
                             type:null,
                             description:null,
                             availability:null,
                                 }
         if(landmarkId === null){
         const requestOptions = {
           method:'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(landmarkObject)
         };
     
         let returnId = fetch(API_BASE + API_LANDMARKS, requestOptions)
           .then(res => res.json())
           .then(setLandmarkId(returnId))
           }
 
         else{
             landmarkObject = {
                                 id: landmarkId,
                                 image:null,
                                 name:null,
                                 address:null,
                                 type:null,
                                 description:null,
                                 availability:null,
                             }
 
                 const requestOptions = {
                   method:'PUT',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(landmarkObject)
                 };
             
                 fetch(API_BASE + API_LANDMARKS + landmarkId, requestOptions)
                   .then(res => res.json())
         }
         }

    function getLandmarks(itineraryId){
            fetch(API_BASE + API_LANDMARKS + itineraryId)
            .then(res => res.json())
            .then(landmarks => {
                setCurrentItin(landmarks);
                setRenderLandmark(!renderLandmark);
            }
        );
        }

let landmarks;
if(renderLandmark){
    landmarks = currentItin.map((landmark) => 
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


    const {
        ready, 
        value, 
        setValue, 
        suggestions: {status, data}, 
        clearSuggestions
    } = usePlacesAutocomplete();


    const handleSelect = async (value) => {
        setValue(value, false);
        clearSuggestions();
        
        const results = await getGeocode({address: value});
        const {lat, lng} = await getLatLng(results[0]);                              
        props.setSelectedPoint({lat, lng});
        props.setMarker({lat, lng});
         submit();
       setSelectedValue({lat, lng});
    }

    const submit = () => {
                const parameter = {
          placeId :data[0].place_id,
      fields: ["name", "types", "formatted_address", "opening_hours", "photos"],
        };
    
        getDetails(parameter)
          .then((details) => {
            setLandmarkName(details.name)
            setlandmarkAddress(details.formatted_address)
            setLandmarkType(details.types.join(", "))
            setLandmarkAvailability(details.opening_hours.weekday_text.join(", "))
            setLandmarkPic(details.photos[0].getUrl())
            console.log("Details", details)
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      };

      function searchResultButton(place){
        const parameter = {
          placeId :place.place_id,
      fields: ["name", "types", "formatted_address", "opening_hours", "photos"],
        };
        getDetails(parameter)
          .then((details) => {
            setLandmarkName(details.name)
            setlandmarkAddress(details.formatted_address)
            setLandmarkType(details.types.join(", "))
            setLandmarkAvailability(details.opening_hours.weekday_text.join(", "))
            setLandmarkPic(details.photos[0].getUrl())})
      }
    

    return(
        <div>
            <Combobox onSelect={handleSelect}>
                <ComboboxInput 
                value={value} 
                onChange={e => setValue(e.target.value)}
                disabled={!ready}
                className="combobox-input"
                placeholder="Enter Search Here"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && 
                        data.map(({place_id, description}) => (
                            <ComboboxOption key = {place_id} value={description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
            <div className="searchButtonsBox">
            <NearByPlaces selected={selectedValue} map={props.map} searchResultButton={searchResultButton}/>
            <div>
            <button className = "reset-button" onClick = {props.handleCenterClick}>Center Map</button>
            <button className = "reset-button" onClick={props.setStartingPoint}>Set As Starting Point</button>
            <button className = "reset-button" onClick = {props.handleStartingClick}>Starting Point</button> 
            
                       <div className = "toggle-switches">
                        
                        <ToggleSwitch type = "FOOD"/>
                        <ToggleSwitch type = "MUSEUMS"/>
                        <ToggleSwitch type = "PARKS"/>
                        <ToggleSwitch type = "STORES"/>
                        <DatePicker selected={date} onChange={date => setDate(date)} />
                        </div>
            <Landmark 
            name = {landmarkName} 
            address = {landmarkAddress} 
            type ={landmarkType}
            pic = {landmarkPic}
            availability = {landmarkAvailability}
            />
            </div>
            </div> 
        </div>
    )
}