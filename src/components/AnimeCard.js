import React from 'react';
import '../stylesheets/AnimeCard.css'

const AnimeCard = (props) => {
  return (
    <div className="animeCard-container">
     <div className="animeCard">
      <div className="front face">
        <img src={props.image}/>
      </div>
      <div class="back face">
        <h1>{props.title}</h1>
        <p>{props.title_japanese}</p>
        <p>{`Score: ${props.score}`}</p>
      </div>
     </div>
    </div>
  )
}

export default AnimeCard