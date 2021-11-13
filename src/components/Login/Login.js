import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLogInFramework, handleGoogleSignIn, handleSignOut, signInFB, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';



function Login() {
  const [newUser, setNewUser] = useState(false)
  const [users, setUsers] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false,
  });
  initializeLogInFramework()

const [loggedInUser, setLoggedInUser] = useContext(UserContext)
 const history = useHistory()
 const location = useLocation()
 let { from } = location.state || { from: { pathname: "/" } };



const GoogleSignIn = () => {
  handleGoogleSignIn()
  .then(res => {
    handleResponse(res, true)
  })
}
const fbSignIn = () =>{
  signInFB().then(res=> {
    handleResponse(res, true)
  })

}

const googleSignOut =() =>{
  handleSignOut()
  .then(res=> {
    handleResponse(res, false)
  })
}

  const handleBlur = (event) => {

    let isFormValid = true;

    if (event.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value)

    }
    if (event.target.name === 'password') {
      const signPasswordValid = event.target.value.length > 6;
      const anotherPassword = /[1-9]/.test(event.target.value)
      const anotherPasswords = /(?=.*[!@#$%^&*])/.test(event.target.value)

      isFormValid = signPasswordValid && anotherPassword && anotherPasswords;
    }
    if (isFormValid) {
      const newUserInfo = { ...users }
      newUserInfo[event.target.name] = event.target.value;
      setUsers(newUserInfo)
    }

  }
  const handleSubmit = (e) => {
    if (newUser && users.email && users.password) {
      
createUserWithEmailAndPassword(users.name, users.email, users.password)
.then(res => {
  handleResponse(res, true)

})
    }
    if (!newUser && users.email && users.password) {
     signInWithEmailAndPassword( users.email, users.password)
     .then(res => {
       handleResponse(res, true)
     })
    }
    
  e.preventDefault()
}
const handleResponse = (res, redirect) =>{
  setUsers(res)
  setLoggedInUser(res)
  if(redirect){
    history.replace(from);
  }
}

  return (
    <div style = {{textAlign : 'center'}}>
      {
        users.isSignedIn ? <button onClick={googleSignOut}>sign out</button> : <button onClick={GoogleSignIn}>sign in</button>
      }
      <br/>
      <button onClick = {fbSignIn}>Button for Facebook Log in</button>

      {
        users.isSignedIn && <div><p>Welcome , {users.name}</p>
          <p>Here is your Email : {users.email}</p>
          <img src={users.photo} alt="" />
        </div>
      }

      <h1>Our OWn Authenication System </h1>
      <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
      <label htmlFor="newUser">New User Sign up</label>

      <form onSubmit={handleSubmit}>

        {newUser && <input onBlur={handleBlur} name="name" placeholder="Enter Your name here" type="text" />} <br />
        <input onBlur={handleBlur} name="email" placeholder="Enter Your Email address" required type="text" />
        <br />
        <input onChange={handleBlur} type="password" name="password" placeholder=" Enter Your Password" required />
        <br />
        <input type="submit" value= {newUser ? "Sign Up" : "Sign In"} />
      </form>
      <p style={{ color: 'red' }}>{users.error}</p>
      {users.success && <p style={{ color: 'green' }}>SuccessFully {newUser ? "Created" : 'Logged'} In</p>}
    </div>
  );
}

export default Login;
