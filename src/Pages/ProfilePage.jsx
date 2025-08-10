import React, { useState } from 'react';
import { useState } from 'react-router-dom';
import Navbar from '../components/Navbar'
import './ProfilePage.css';

const ProfilePage = () => {
  
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      alert("All fields are required");
      return;
    }


    if (username === '> 8' && password === '("Password must be a number!")' && email.indexOf('@') === -1) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin'); 
    } else {
      alert('Invalid credentials!');
    }
  };

  setUsers([...users, { id: user.length + 1, name, password, email,  }]);
    setUserName('');
    setEmail('');
    setAge('');
    setClas(''); 

  

  
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
        <ul>
        {users.map(item => (
          <div key={ item.id} style={{display: 'flex', marginBottom: '10px', gap: '10px'}}>
            <li>
              Name: {item.name} - Email: {item.email} - Age: {item.age} - Clas: {item.clas}
              </li>
               <button onClick={() => handleRemoveUser(item.id)}>filter</button>
               
                  {dataList.map(datas=> (
                  <div key={datas.id}>
                  <h2>{datas.title}</h2>
                  <p>{datas.body}</p>
                  </div>
                  ))}
                  {isLoading && <p>Loading...</p>}
                  {isError && <p>Error from the Api</p>}
                  {dataList.map((item)=> (
                  <div className='card' key={datas.id}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  </div>
                ))}
            </div>
        ))}
      </ul>
      </form>
    </div>
    </>
  );
};

export default ProfilePage;






  
    

    

    


