import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const onSubmit = data => {
      console.log("form Submitted", data)
    };

  console.log(watch("example")); 

  return (
    
    <form style = {{background : "#191d3a"}} className = "ship-form" onSubmit={handleSubmit(onSubmit)}>
        <img style = {{borderRadius : "50%", height : "100px", width : "100px"}} src= {loggedInUser.photo} alt="User Photo"/>
      <input placeholder = "Your Name" defaultValue = {loggedInUser.name} name="name" ref={register({ required: true })} />
      {errors.name && <span className = "error">Name is required</span>}

      <input placeholder = "Your Email" defaultValue = {loggedInUser.email}  name="email" ref={register({ required: true })} />
      {errors.email && <span className = "error">email is required</span>}

      <input placeholder = "Your Address" name="address" ref={register({ required: true })} />
      {errors.address && <span className = "error">Address is required</span>}

      <input placeholder = "Your Phone Number" name="phone" ref={register({ required: true })} />
      {errors.phone && <span className = "error">phone Number is required</span>}

      <input placeholder = "Your Street code" name="street" ref={register({ required: true })} />
      {errors.street && <span className = "error">street is required</span>}
      
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;