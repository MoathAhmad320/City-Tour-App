import React, { useState, useEffect } from 'react'
import AutoComplete from '../AutoComplete';
import { TypesArr } from './Types';
import { NearByDiv, NearbyLi } from './PlaceElement';




export default function NearByPlaces(props) {
  const { map } = props
  const [placesNearByArr, setPlacesNearByArr] = useState(/**type @Array */ [])
  const [placeToRequest, setPlaceToRequest] = useState( )

  function search() {
    let request = {
      location: placeToRequest,
      radius: '500',
      //TYPES OF PLACES TO LOOK FOR. CURRENTLY SET TO ONLY RESTAURANTS
      type: [TypesArr.RESTAURANT]
    };
    //eslint-disable-next-line no-undef
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }
  function callback(results, status) {
    //eslint-disable-next-line no-undef
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      setPlacesNearByArr(results)
    }
  }
  

  useEffect(() => {
    map && search();
    console.log(placesNearByArr)

  }, [placeToRequest])

  return (
    <NearByDiv>
      <AutoComplete changeLocationSelected={setPlaceToRequest} />
      <ul>
      { 
      Object.keys(placesNearByArr).map((place, i) => (
          <NearbyLi key={i}>
              
              <img src={placesNearByArr[place].icon} width='8%' height='3%'/>
              { placesNearByArr[place].name }
              <img src={placesNearByArr[place].photos[0].getUrl()} width='50%'/>
          </NearbyLi>
      ))
  }  
      </ul>
    </NearByDiv>
  )
}
