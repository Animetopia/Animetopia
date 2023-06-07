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
          <div className="animeCard-Container" style = {{transform: 'none'}}>
            <h2>{animeData.data.title}</h2>
            <div className="front-face">
              <img src={animeData.data.images.jpg.image_url}/>
            </div>
            <h2>{`Score: ${animeData.data.score}`}</h2>
          </div>

          <div className="animeContent-Container">
            <h2>{`Synopsis: ${animeData.data.synopsis}`}</h2>
          </div>
        </div>
    )
}
export default AnimePage