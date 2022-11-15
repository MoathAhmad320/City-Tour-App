import usePlacesAutocomplete, {getGeocode, getLatLng, getDetails} from "use-places-autocomplete"
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from '@reach/combobox'
import "@reach/combobox/styles.css"
import Landmark from "../Landmark/Landmark";
import { useState } from "react";
import ToggleSwitch from '../ToggleSwitch/ToggleSwtich';
import DatePicker from "react-datepicker"

export default function Places(props){
    const [landmarkName, setLandmarkName] = useState();
    const [landmarkType, setLandmarkType] = useState();
    const [landmarkAddress, setlandmarkAddress] = useState();
    const [landmarkPic, setLandmarkPic] = useState();
    const [landmarkDescription, setLandmarkDescription] = useState();
    const [landmarkAvailability, setLandmarkAvailability] = useState();
    
    const [date, setDate] = useState(new Date());






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
            <button className = "reset-button" onClick = {props.handleCenterClick}>Center Map</button>
            <button className = "reset-button" onClick={props.setStartingPoint}>Set As Starting Point</button>
            <button className = "reset-button" onClick = {props.handleStartingClick}>Starting Point</button>
                        <div className = "toggle-switches">
                        <ToggleSwitch/>
                        <ToggleSwitch/>
                        <ToggleSwitch/>
                        <ToggleSwitch/>
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
    )
}