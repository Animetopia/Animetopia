import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AnimeCard from './AnimeCard';
import Navbar from './Navbar';
import { ArrowBackOutline } from 'react-ionicons';
import '../stylesheets/SearchResult.css';

const SearchResult = () => {
  const location = useLocation();
  const searchResult = location.state?.searchResult;
  const userId = location.state?.userId

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/home');
  }

  return (
    <div>
      <Navbar />
      <button className="back-btn" data-form-button onClick={handleClick}>
        <ArrowBackOutline />
      </button>  
      {searchResult.length !== 0 
      ? (searchResult.map(anime => {
        return (<AnimeCard 
          image={anime.images.jpg.image_url}
          title={anime.title}
          score={anime.score}
          id={anime.mal_id}
          userId={userId}
          />)
      }))
      : <p>Loading...</p>
    }
    </div>
  )
}

export default SearchResult