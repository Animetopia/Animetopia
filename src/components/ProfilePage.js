// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../stylesheets/ProfilePage.css";

// const defaultProfilePic = "https://via.placeholder.com/150";

// const ProfilePage = (userId) => {
//   const [description, setDescription] = useState("");
//   const [selectedFile, setSelectedFile] = useState();
//   const fileSelectedHandler = event => {
//     setSelectedFile(event.target.files[0]);
//   };
//   const fileUploadHandler = () => {
//     const fd = new FormData();
//     fd.append('image', selectedFile, selectedFile.name);
//     // axios.post('/api/upload', fd, {
//     //     onUploadProgress: progressEvent => {
//     //         console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
//     //     }
//     // })
//     // .then(res => {
//     //     console.log(res);
//     // });
// };

//   useEffect(() => {
//     fetch("/user/checkDesc", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data) {
//           setDescription(data);
//         }
//         // else do something if data is null
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//   };

//   const handleSave = () => {
//     // description
//     //sends description back to db
//     //
//     console.log(description);
//     fetch("/user/saveDesc", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ description }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data) {
//           setDescription(data);
//         }
//       });
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-picture-container">
//         <img src={defaultProfilePic} alt="Profile" className="profile-pic" id="profPhoto"/>
//         <input type="file" id="file" onChange={fileSelectedHandler} />
//         <label for="file" id="uploadButton"></label>
//       </div>

//       <button onClick={handleSave} className="save-button">
//         Save
//       </button>
//     </div>
//   );
// };

// export default ProfilePage;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/ProfilePage.css";

const defaultProfilePic = "https://via.placeholder.com/150";

const ProfilePage = (userId) => {
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [profilePic, setProfilePic] = useState(defaultProfilePic); // Add profilePic state

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);

    //using axios api to upload the image to the server
    //still need to update the URL and uncomment the code
    // axios.post('/api/upload', fd, {
    //     onUploadProgress: (progressEvent) => {
    //         console.log(
    //             'Upload Progress: ' +
    //                 Math.round(
    //                     (progressEvent.loaded / progressEvent.total) * 100
    //                 ) +
    //                 '%'
    //         );
    //     }
    // })
    // .then((res) => {
    //     console.log(res);
    //     // Assuming the server responds with the uploaded image URL
    //     setProfilePic(res.data.imageUrl);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });

    // Since we don't have an actual upload implementation, we'll simulate it by setting the profilePic state to a local file URL
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  // ...

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
      <div className="profile-picture-container">
        <img src={profilePic} alt="Profile" className="profile-pic" id="profPhoto" />
        <input type="file" id="file" onChange={fileSelectedHandler} />
        <label htmlFor="file" id="uploadButton"></label>
      </div>
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter description here..."
        className="description-box"
      />
      {/* ... */}
    </div>
  );
};

export default ProfilePage;

