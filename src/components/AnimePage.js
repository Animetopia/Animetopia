import React from 'react';
import { useLocation } from 'react-router-dom';
import '../stylesheets/AnimePage.css'

const AnimePage = (props)=>{
    const location = useLocation();
    console.log('location: ', location)
    const animeData = location.state.data;
    console.log('animeData: ', animeData)
    return (
        <div className="animePage-Container">
          <div className="animeCard" style = {{transform: 'none'}}>
            <h1>{animeData.data.title}</h1>
            <div className="front face">
              <img src={animeData.data.images.jpg.image_url}/>
            </div>
            <p>{`Score: ${animeData.data.score}`}</p>
          </div>
        </div>
    )
}
export default AnimePage