import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/ProfilePage.css";

const defaultProfilePic = "https://via.placeholder.com/150";

const ProfilePage = (userId) => {
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const fileSelectedHandler = event => {
    setSelectedFile(event.target.files[0]);
  };
  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name);
    // axios.post('/api/upload', fd, {
    //     onUploadProgress: progressEvent => {
    //         console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
    //     }
    // })
    // .then(res => {
    //     console.log(res);
    // });
};

  useEffect(() => {
    fetch("/user/checkDesc", {
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
    fetch("/user/saveDesc", {
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
      <input type="file" onChange={fileSelectedHandler} />
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
