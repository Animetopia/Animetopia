import React from 'react';
import '../stylesheets/AnimeCard.css'
import { useNavigate } from "react-router-dom";

const AnimeCard = (props) => {
  const navigate = useNavigate();
  function cardClick(){
    //navigate to AnimePage within our single page application
    //pass in whole object from that anime to AnimePage from AnimeCard
    //we have prop drilled id into props.id

    //do a fetch call based on props.id, and pass that entire state into animepage when we navigate there

    const fetchSingle = async ()=>{
      try {
        const response = await fetch(
            `https://api.jikan.moe/v4/anime/${props.id}/full`
        );
        const data = await response.json();
        console.log("data: ", data);
        navigate("/animePage", { state: { data: data }})
      } catch (err) {
        console.log("err in fetching anime: ", err)
      }
    }
    fetchSingle();
    // navigate("/animePage", { state: { id: props.id, image: props.image, title: props.title, score: props.s÷core } }); //route not yet configured
    
  }
  return (
    <div className="animeCard-container">
     <div className="animeCard">
      <div className="front face">
        <img src={props.image} onClick = {cardClick} style = {{cursor: 'pointer'}}/>
      </div>
      <div className="back face" onClick = {cardClick} style = {{cursor: 'pointer'}}>
        <h1>{props.title}</h1>
        <p>{`Score: ${props.score}`}</p>
      </div>
     </div>
    </div>
  )
}

export default AnimeCard