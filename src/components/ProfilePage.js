import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/ProfilePage.css";

const defaultProfilePic = "https://via.placeholder.com/150";

const ProfilePage = (userId) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("/users/checkDesc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setDescription(data);
        }
        // else do something if data is null
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSave = () => {
    // description
    //sends description back to db
    //
    console.log(description);
    fetch("/users/checkDesc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setDescription(data);
        }
      });
  };

  return (
    <div className="profile-container">
      <img src={defaultProfilePic} alt="Profile" className="profile-pic" />
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter description here..."
        className="description-box"
      />
      <button onClick={handleSave} className="save-button">
        Save
      </button>
    </div>
  );
};

export default ProfilePage;
