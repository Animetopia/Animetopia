import React, { useState, useEffect } from "react";
import "../stylesheets/AnimeCard.css";
import { useNavigate } from "react-router-dom";
import { HeartOutline } from "react-ionicons";
import { HeartCircleOutline } from "react-ionicons";

const AnimeCard = (props) => {
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();
  function cardClick() {
    //navigate to AnimePage within our single page application
    //pass in whole object from that anime to AnimePage from AnimeCard
    //we have prop drilled id into props.id

    //do a fetch call based on props.id, and pass that entire state into animepage when we navigate there

    const fetchSingle = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${props.id}/full`
        );
        const data = await response.json();
        navigate("/animePage", { state: { data: data } });
      } catch (err) {
        console.log("err in fetching anime: ", err);
      }
    };
    fetchSingle();
  }

  // function to check if this anime is faved by the user
  const checkFav = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: props.userId, malId: props.id }),
      };
      const response = await fetch("/anime/getLiked", requestOptions);
      // console.log("response: ", response)
      const data = await response.json();
      // console.log("data from isLiked: ", data)
      if (data === true) setLiked(true);
      else setLiked(false);
    } catch (err) {
      console.log("Err in fetching if faved for the user: ", err);
    }
  };

  useEffect(() => {
    checkFav();
  }, []);

  const clickHeart = async () => {
    // if already liked, delete that from DB
    if (liked) {
      try {
        const requestOptions = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: props.userId, malId: props.id }),
        };
        const response = await fetch("/anime/deleteFavAnime", requestOptions);
        if (response.ok) setLiked(false);
      } catch (err) {
        console.log("Err in deleting liked anime: ", err);
      }
    } else {
      // else, post to add this to liked in DB
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: props.userId, malId: props.id }),
        };
        const response = await fetch("/anime/addFavAnime", requestOptions);
        console.log("response: ", response);
        if (response) setLiked(true);
      } catch (err) {
        console.log("Err in posting new liked anime: ", err);
      }
    }
  };

  return (
    <div className="animeCard-container">
      <div className="animeCard">
        <div className="front face">
          <img className="cardImage" src={props.image} />
        </div>
        <div className="back face">
          <button className="like-btn" onClick={clickHeart}>
            {liked ? (
              <HeartCircleOutline color={"#e8c721"} />
            ) : (
              <HeartOutline />
            )}
          </button>
          <h1 onClick={cardClick} style={{ cursor: "pointer" }}>
            {props.title}
          </h1>
          <div className="score-show">{`Score: ${props.score}`}</div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
