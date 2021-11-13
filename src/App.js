import React, { createContext } from 'react'; 
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import Error from './components/Error/Error';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext()

function App() {
const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      {/* <h3>Email : {loggedInUser.email}</h3> */}
     
      <Router>
      <Header></Header>
        <Switch>
        <Route path ='/shop'>
        <Shop></Shop>
        </Route>
        <Route path = '/review'>
     <Review></Review>
        </Route>
        <Route  path ='/product/:productKey'>
          <ProductDetail></ProductDetail>

        </Route>
        <PrivateRoute path = "/manage">
         <Manage></Manage>
        </PrivateRoute>
        
        <PrivateRoute  path ='/shipment'>
          <Shipment></Shipment>
        </PrivateRoute>
        <Route  path ='/login'>
          <Login></Login>

        </Route>
        <Route exact path ='/'>
<Shop></Shop>
        </Route>
        
        <Route  path ="*">
          <Error></Error>
        </Route>
        </Switch>
      </Router>
      
     
    </UserContext.Provider>
  );
}

export default App;
