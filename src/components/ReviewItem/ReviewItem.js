import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity, img ,key,price } = props.product
    const styleName = {
        color : "black",
        borderBottom : "2px solid lightgray",
        marginBottom : "10px",
        paddingBottom : "15px",
        marginLeft : "40px"
    }
    return (
        <div style = {styleName}>
            <h2>This is {name}</h2>
            <img src={img} alt=""/>
    <p> price :${price}</p>
            <p>{quantity}</p>
            <br/>
            <button  className = "main-btn" 
            
            onClick = {() => props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;