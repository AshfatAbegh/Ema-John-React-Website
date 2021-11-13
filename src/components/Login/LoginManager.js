import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLogInFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }
}
export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      return signedInUser
      // console.log(displayName, photoURL ,email);
    })
    .catch(err => {
      console.log(err, err.message);
    })
}


export const signInFB = () => {
  const FBprovider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(FBprovider).then(function (result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    user.success = true
    return user;
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}


export const handleSignOut = () => {
  return firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      return signOutUser
    })
    .catch(err =>
      console.log(err))
}

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
    console.log(res);
    const newUserInfo = res.user
    newUserInfo.error = ''
    newUserInfo.success = true
    updateDisplayName(name)
  }).catch(error => {
    // Handle Errors here.
    const newUserInfo = {}
    newUserInfo.error = error.message;
    newUserInfo.success = false
    return newUserInfo;
  });
}

export const signInWithEmailAndPassword = (email, password) => {
 return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user
            newUserInfo.error = ''
      newUserInfo.success = true
      return newUserInfo; 
    })
    .catch(function (error) {
      const newUserInfo = {}
      newUserInfo.error = error.message;
      newUserInfo.success = false
      return newUserInfo
    });
}


export const updateDisplayName = name => {
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(function () {
    // Update successful.
    console.log('This Name Property Updated Successfully');
  }).catch(function (error) {
    // An error happened.
    console.log(error);
  });
}