import React from "react"

export default function LandmarkStatus(props){
    const API_BASE = "http://localhost:8080/";
    const API_ITINERARY = 'itineraries/'
    const API_LANDMARKS = '/landmarks/'
    const API_LIKEDSTATUS = '/likedStatus'
    
    const[likedId, setLikedId] = React.useState(null)
    const[liked, setLiked] = React.useState(null)
    const[likedStatus, setLikedStatus] = React.useState(null)

    function deleteLandmark(id) {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        };
    
        fetch(API_BASE + API_LANDMARKS + id, requestOptions)
          .then(res => res.json())
      }

      function handleLiked(like, id) {
        setLikedStatus({
                        //needs resolved user_id
                        userId: "?",
                        landmarkId: id,
                        liked: like})
        if(liked === null){
        const requestOptions = {
          method:'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(likedStatus)
        };
    
        let returnId = fetch(API_BASE + API_LIKEDSTATUS , requestOptions)
          .then(res => res.json())
          .then(like => {setLiked(like)})
          .then(setLikedId(returnId))
          }

        else{
                const requestOptions = {
                  method:'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(likedStatus)
                };
            
                fetch(API_BASE + API_LIKEDSTATUS + likedId, requestOptions)
                  .then(res => res.json())
                  .then(like => setLiked(like))
        }
        }
    
      





    return(
        <div>
            <div>
                <button onClick = {deleteLandmark(props.id)}>delete</button>
            </div>
            
            <div>
                <div>
                <button >Like button</button>
                </div>
                <div>
                <button>Dislike button</button>
                </div>
            </div>


        </div>
    )
    //onClick = {handleLiked(true, props.id) onClick = {handleLiked(false, props.id)}}
}