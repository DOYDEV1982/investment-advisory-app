import React, { useEffect} from 'react'
import { Link } from "react-router-dom"
import { useState } from 'react'
import Navbar from '../components/Navbar'
import '../Pages/'

   

const UserManagementPage = () => {

  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState('')
  const [role, setRole] = useState('user')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    
    fetch('https://openexchangerates.org/')
      .then(response => response.json()) 
      .then(users => setUsers(users))
      
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleAddUser = () => {
    if (!newUser.trim()) {
      setFeedback(' Username cannot be empty.');
      return;
    }
    const exists = users.some(user => user.name.toLowerCase() === newUser.toLowerCase());
    if (exists) {
      setFeedback(' User already exists.');
      return;
    }
    const updatedUsers = [...users, { name: newUser, role }];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setNewUser('');
    setRole('user');
    setFeedback(' User added successfully.');
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setFeedback(' User deleted.');
  };

  return (
    <>
    <Navbar />
    <div className="user-management">
      <div className="admin-nav">
        <Link to="/adminPage">⬅ Back to AdminPage</Link>
        <Link to="/marketdata" className="nav-link">MarketData</Link>
        <Link to="/analytics" className="nav-link">AnalyticsPage</Link>
        <Link to="/watchlist" className="nav-link">WatchlistPage</Link>
      </div>

      <h2>User Management</h2>

      <div className="add-user-form">
        <input
          type="text"
          placeholder="Enter username"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleAddUser}>Add User</button>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>

      <ul className="user-list">
        {users.map((user, index) => (
          <li key={index}>
            <span>{user.name} ({user.role})</span>
            <button onClick={() => handleDeleteUser(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default UserManagementPage;
