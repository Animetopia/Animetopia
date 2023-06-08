
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import YouTube from "react-youtube";
import '../stylesheets/AnimePage.css'


const AnimePage = (props)=>{
    const location = useLocation();
    console.log('location: ', location)
    const animeData = location.state.data;
    console.log('animeData: ', animeData)
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