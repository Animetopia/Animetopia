import React, { useState, useEffect } from 'react';
import AnimeCard from './AnimeCard';

const HomePage = () => {

  const [seasonalAnime, setSeasonalAnime] = useState([]);

  const fetchAnime = async () => {
    try {
        const response = await fetch(
            "https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&page=1&limit=21"
        );
        const data = await response.json();
        // console.log("data: ", data);
        setSeasonalAnime(data.data);
    } catch (err) {
        console.log("err in fetching anime: ", err)
    }
  }

  useEffect(() => {
    fetchAnime();
  }, [])

  useEffect(() => {
    console.log("seasonalAnime: ", seasonalAnime);
  }, [seasonalAnime])

  return (
    <div>
      {seasonalAnime.length !== 0 
      ? (seasonalAnime.map(anime => {
        return (<AnimeCard 
          image={anime.images.jpg.image_url}
          title={anime.title}
          titleJP={anime.title_japanese}
          score={anime.score}
          />)
      }))
      : <p>Loading...</p>
    }
    </div>
  )
}

export default HomePage