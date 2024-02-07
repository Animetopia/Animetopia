import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimeCard from "./AnimeCard";
import Navbar from "./Navbar";
import "../stylesheets/HomePage.css";
import { SearchOutline } from "react-ionicons";

const HomePage = (props) => {
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchAnime = async () => {
    try {
      const response = await fetch(
        // "https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&page=1&limit=40"
        // "https://api.jikan.moe/v4/top/anime?type=tv"
        "https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&page=1"
      );
      const data = await response.json();
      console.log("data: ", data);
      setSeasonalAnime(data.data);
    } catch (err) {
      console.log("err in fetching anime: ", err);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  // functions to handle search anime
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    let str = searchText;
    str = str.replace(/\s+/g, "%20");
    const url =
      "https://api.jikan.moe/v4/anime?q=" +
      str +
      "&limit=8&order_by=scored_by&sort=desc";
    async function searchAnime() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) setSearchText("");
        else
          navigate("/search-results", {
            state: { searchResult: data.data, userId: props.userId },
          });
      } catch (err) {
        console.log("err in searching anime: ", err);
      }
      setSearchText("");
    }
    searchAnime();
  };

  return (
    <div className="big-container">
      <Navbar />
      <div className="search-container" data-container>
        <form className="form">
          <input
            className="form__input"
            type="text"
            placeholder="search for anime of your interest!"
            value={searchText}
            onChange={handleSearchChange}
            autoComplete="off"
            data-form-input
          />
          <button className="form__btn" data-form-button onClick={handleSearch}>
            <SearchOutline />
          </button>
        </form>
      </div>
      <div className="home-container">
        <h1 className="seasonal-title">Top Seasonal Anime</h1>
        <div className="animeContainer">
          {seasonalAnime.length !== 0 ? (
            seasonalAnime.map((anime) => {
              return (
                <AnimeCard
                  image={anime.images.jpg.image_url}
                  title={anime.title}
                  score={anime.score}
                  id={anime.mal_id}
                  userId={props.userId}
                  className="gridCard"
                />
              );
            })
          ) : (
            <img src="https://media.tenor.com/kaRCm9ELxKgAAAAC/menhera-chan-chibi.gif" />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
