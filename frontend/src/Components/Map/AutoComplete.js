import { useRef, useEffect} from "react";


const AutoComplete = ({changeLocationSelected}) => {

 const autoCompleteRef = useRef();
 const inputRef = useRef();
 const options = {
  componentRestrictions: { country: "us" },
  fields: ["address_components", "geometry", "icon", "name"],
  types: ["establishment"]
 };

 useEffect(() => {
  autoCompleteRef.current = new window.google.maps.places.Autocomplete(
   inputRef.current,
   options
  );
  autoCompleteRef.current.setFields(['geometry']);
  autoCompleteRef.current.addListener("place_changed", async function () {
    const place = await autoCompleteRef.current.getPlace();
    const data = place.geometry.location
      //eslint-disable-next-line no-undef
    changeLocationSelected(new google.maps.LatLng(data.lat(),data.lng()));
   });
     // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 return (
  <div>
   <label>Reference Point:</label>
   <input ref={inputRef}/>
  </div>
 );
};
export default AutoComplete;