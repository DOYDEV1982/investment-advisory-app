import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import '../ProfilePage.css';

const ProfilePage = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2>My Profile</h2>
        <form className="profile-form">
          <div className="profile-pic-section">
            <img
              src={image || "https://via.placeholder.com/120"}
              alt="Profile"
              className="profile-pic"
            />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          <label>
            Full Name:
            <input type="text" placeholder="Enter your name" />
          </label>

          <label>
            Email:
            <input type="email" placeholder="Enter your email" />
          </label>

          <label>
            Phone:
            <input type="tel" placeholder="Enter your phone number" />
          </label>

          <label>
            Bio:
            <textarea placeholder="Write something about yourself..." />
          </label>

          <button type="submit">Update Profile</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
