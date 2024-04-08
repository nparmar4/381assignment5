import React from "react";
import {useState} from "react";
import LoginForm from "./LoginForm.js"

function SignupForm(){
  const [signup, setSignup] = useState(true)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [email, setEmail] = useState("");
  
  async function handleSignup(){
    const errorMessage = document.getElementById('errorMessage');
    if(username === "" || password === "" || conPassword === "" || email === ""){
      errorMessage.innerText = "All fields are required!"
      return;
    }
    else if(password !== conPassword){
      errorMessage.innerText = "Passwords do not match."
      return;
    }
    else{
      try{
        const response = await fetch('http://127.0.0.1:5000/signup', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"username":username, "password":password, "email":email}),
        });
        if(response.ok){
          errorMessage.innerText = "User successfully signed up"
        }else{
          errorMessage.innerText = "Username is already taken!"
        }
      } catch(error){
        console.error('Error during signup', error);
      }
    }
  }

  return(
    signup?
    (<>
      <div>
        <p id='errorMessage' style={{color: "red"}}></p>
      </div>
      <div id="signupForm">
        <label for='username'>Username:</label>
        <input type='text' onChange={(e)=> setUsername(e.target.value)} id='username' placeholder="Enter your username"></input><br/>
        <label for='password'>Password:</label>
        <input type='password' onChange={(e)=> setPassword(e.target.value)} id='password' placeholder="Enter your password"></input><br/>
        <label for='confirmPassword'>Confirm Password:</label>
        <input type='password' onChange={(e)=> setConPassword(e.target.value)} id='confirmPassword' placeholder="Confirm your password"></input><br/>
        <label for='email'>Email:</label>
        <input type='email' onChange={(e)=> setEmail(e.target.value)} id='email' placeholder="Enter your email"></input><br/>
        <button onClick={handleSignup}>Signup</button><br/>
        <button onClick={()=>setSignup(!signup)}>Switch to Login</button>
      </div>
    </>
)
    :
    <LoginForm/>
  )
}
export default SignupForm;