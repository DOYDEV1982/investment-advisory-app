import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      alert('All fields are required');
      return;
    }

    // Validation: username > 8 chars, password < 8 chars, and email missing '@'
    if (username.length > 8 && password.length < 8 && email.indexOf('@') === -1) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    } else {
      alert('Invalid credentials!');
    }

    // Add user to list
    setUsers((prev) => [
      ...prev,
      { id: prev.length + 1, name: username, email, password },
    ]);

    // Reset form fields
    setUserName('');
    setEmail('');
    setPassword('');
  };

  const handleRemoveUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        {/* Display saved users */}
        <ul>
          {users.map((item) => (
            <li key={item.id} style={{ marginBottom: '10px' }}>
              Name: {item.name} — Email: {item.email}
              <button
                style={{ marginLeft: '10px' }}
                onClick={() => handleRemoveUser(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProfilePage;
