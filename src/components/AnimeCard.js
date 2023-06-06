import React from 'react';
import '../stylesheets/AnimeCard.css'

const AnimeCard = (props) => {
  function cardClick(){
    //navigate to AnimePage within our single page application
    //pass in whole object from that anime to AnimePage from AnimeCard
  }
  return (
    <div className="animeCard-container">
     <div className="animeCard">
      <div className="front face">
        <img src={props.image}/>
      </div>
      <div class="back face">
        <h1>{props.title}</h1>
        <p>{`Score: ${props.score}`}</p>
      </div>
     </div>
    </div>
  )
}

export default AnimeCard