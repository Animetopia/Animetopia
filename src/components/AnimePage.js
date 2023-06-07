
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeartOutline, HeartCircleOutline } from 'react-ionicons';
import Navbar from './Navbar';
import YouTube from "react-youtube";
import '../stylesheets/AnimePage.css'


const AnimePage = (props)=>{
  
  const location = useLocation();
  //console.log('location: ', location)
  const animeData = location.state.data;
  //console.log('animeData: ', animeData);
  const userId = location.state?.userId;

  const [liked, setLiked] = useState(false);

  // function to check if this anime is faved by the user
  const checkFav = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId: userId, malId: animeData.data.mal_id})
      };
      const response = await fetch('/anime/getLiked', requestOptions);
      // console.log("response: ", response)
      const data = await response.json();
      // console.log("data from isLiked: ", data)
      if (data === true) setLiked(true);
      else setLiked(false);
    } catch (err) {
      console.log("Err in fetching if faved for the user: ", err);
    }
  }

  useEffect(() => {
    checkFav()}, []);

  const clickHeart = async () => {
    // if already liked, delete that from DB
    if (liked) {
      try {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({userId: userId, malId: animeData.data.mal_id})
        };
        const response = await fetch('/anime/deleteFavAnime', requestOptions);
        if (response.ok) setLiked(false);
      } catch (err) {
        console.log("Err in deleting liked anime: ", err);
      }
    } else { // else, post to add this to liked in DB
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({userId: userId, malId: animeData.data.mal_id})
        };
        const response = await fetch('/anime/addFavAnime', requestOptions);
        // console.log("response: ", response)
        if (response) setLiked(true);
      } catch (err) {
        console.log("Err in posting new liked anime: ", err);
      }
    }    
  }

    return (
        <div className="animePage-Container">
          <Navbar />
          <div className="animeCard-Container" style = {{transform: 'none'}}>
            <h2 className="fancy">{animeData.data.title}</h2>
            <div className="front-face">
              <img src={animeData.data.images.jpg.image_url}/>
            </div>
            <div className="stats">
              <div className="rank-bar">{`Rank: ${animeData.data.rank}`}</div>
              <div className="score-bar">{`Score: ${animeData.data.score}`}</div>
              <div className="scoreby-bar">{`Scored by: ${animeData.data.scored_by}`}</div>
              <div className="like-button-container">
                <button className="like-button" onClick={clickHeart}>
                <div className="icon-wrapper">
                  {liked ? (<HeartCircleOutline color={'#e8c721'}  />) 
                  : (<HeartOutline  />)}
                </div>
                </button>
              </div>
            </div>
            <div className="trailer">
              <YouTube videoId={animeData.data.trailer.youtube_id} />
            </div>
          </div>
          <div className="animeContent-Container">
            <h2 className="synopsis" >Synopsis</h2>
            <p>{animeData.data.synopsis}</p>
          </div>
        </div>
    )
}
export default AnimePage