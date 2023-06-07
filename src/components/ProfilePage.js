import { flexbox } from "@mui/system";
import React, { useState, useEffect } from "react";
import "../stylesheets/ProfilePage.css";
import AnimeCard from './AnimeCard';

const defaultProfilePic = "https://via.placeholder.com/150";

const ProfilePage = (props) => {
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [profilePic, setProfilePic] = useState(defaultProfilePic); 
  const [favoritedAnime, setFavoritedAnime] = useState([]);
  const [animeData, setAnimeData] = useState([]); // Add a new state to hold the fetched anime data to avoid infinite loop issue

  const fetchSingle = async (malId)=>{
    try {
      const response = await fetch(
          `https://api.jikan.moe/v4/anime/${malId}/full`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("err in fetching anime: ", err)
    }
  }
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const saveFavorited = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId: props.userId})
      };
      const response = await fetch('/anime/getId', requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && Array.isArray(data)) { // Check if the data is an array before setting it
        setFavoritedAnime(data);
      } else {
        console.log("Unexpected data format from /anime/getId: ", data);
      }
    } catch (err) {
      console.log("Err in fetching faved anime for the user: ", err);
    }
  }

  useEffect(() => {
    const fetchAnimeData = async () => {
      const animeData = [];
      console.log("favoritedAnime", favoritedAnime)
      for (const anime_id of favoritedAnime) {
        await sleep(1000); // wait 500ms between each fetch
        const anime = await fetchSingle(anime_id);
        console.log("ANIME", anime)
        animeData.push({
          image: anime.data.images.jpg.image_url,
          title: anime.data.title,
          score: anime.data.score,
          id: anime.data.mal_id,
          userId: props.userId,
        });
      }
      setAnimeData(animeData); // Update the animeData state, not favoritedAnime to avoid the infinite loop
    };
    fetchAnimeData();
  }, [favoritedAnime]);

  useEffect(() => {
    saveFavorited();
  },[])

  const cards = animeData.map((anime) => ( // Use animeData for generating the cards
    <AnimeCard
      key={anime.id}
      image={anime.image}
      title={anime.title}
      score={anime.score}
      id={anime.id}
      userId={anime.userId}
    />
  ));

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    if (selectedFile instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const avatar = document.querySelector('.profile-picture');
        avatar.style.backgroundImage = `url(${e.target.result})`;
        setProfilePic(avatar);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  
  

  useEffect(() => {
    fileUploadHandler(); // Call the fileUploadHandler when selectedFile changes
  }, [selectedFile]);

  return (
    <div className="profile-container">
      <div className='avatar-description-container'>
        <div className="profile-picture-container">
          <div className="profile-picture" style={{height: '200px', width: '200px', backgroundColor: 'white'}}>
          </div>
          {/* <img src={profilePic} alt="Profile" className="profile-pic" id="profPhoto" /> */}
          <input type="file" id="file" onChange={fileSelectedHandler} />
          <label htmlFor="file" id="uploadButton"></label>
        </div>
        <textarea
          // value={description}
          // onChange={handleDescriptionChange}
          placeholder="Enter description here..."
          className="description-box"
        />
      </div>
      <div className="favAnime-Container">
        <h2>Favorite Animes!</h2>
        {cards.length !==0 ? [cards]: <img src="https://media.tenor.com/kaRCm9ELxKgAAAAC/menhera-chan-chibi.gif"/>}
      </div>
    </div>
  );
};

export default ProfilePage
