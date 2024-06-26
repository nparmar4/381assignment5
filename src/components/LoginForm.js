import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({toggle, setToggle}){

const navigate = useNavigate();
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [formError, setFormError] = useState('');
const [authenticated, setAuthenticated] = useState(false)

const handleSubmit = (event) => {
  event.preventDefault();

  // If statement if BOTH username and password were entered.
  if (!username.trim() || !password.trim()) {
    // Sets the formError state
    setFormError('Username and Password are required.');
  } else {
    // DEBUG insert code for submitting to the database
    console.log("Username: ", username);
    console.log("Password: ", password);

    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'username': username, 'password': password }),
    })
      .then(response => response.json())
      .then(response => {
        setAuthenticated(response.loggedIn);
        setFormError(response.message);
        if (response.loggedIn) {
          localStorage.setItem('loggedIn', 'true');
          setUsername('');
          setPassword('');
          navigate('/products'); 
        } else {
          localStorage.setItem('loggedIn', 'false');
        }
      })
      .catch(error => {
        alert('Authentication failed. Incorrect username or password.');
        console.log(error);
      });
  }
};



function onSwitchToSignup(){
    setToggle(false);
}
    
return (
    <div>
        <div>
        {formError && <div style={{ color: 'red' }}>{formError}</div>}
        </div>

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="username">Username: </label>
        <input
            type="text"
            id="username"
            placeHolder='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        </div>

        <div>
        <label htmlFor="password">Password: </label>
        <input
            type="password"
            id="password"
            value={password}
            placeHolder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button type="submit">Login</button>
        <br/>
        <button onClick={onSwitchToSignup}>Switch to Signup</button>
    </form>

    <button onClick={()=>localStorage.setItem('loggedIn', 'false')}>Logout</button>
    </div>
    

    );
}

export default LoginForm;