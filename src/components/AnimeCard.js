import React from 'react';
import '../stylesheets/AnimeCard.css'

const AnimeCard = (props) => {
  return (
    <div className="animeCard-container">
     <div className="animeCard">
      <div className="front face">
        <img src={props.image}/>
      </div>
      <div className="back face">
        <h1>{props.title}</h1>
        <div className="score-bar">{`Score: ${props.score}`}</div>
      </div>
     </div>
    </div>
  )
}

export default AnimeCard