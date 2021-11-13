import React from 'react';
import './Cart.css'
import { Link } from 'react-router-dom';

const Cart = (props) => {

    
    const cart = props.cart
    // const Total = cart.reduce((Total, prd) => Total + prd.price ,0)
    // const totalMoney = Total.toFixed(2)
let totalMoney = 0
for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    totalMoney = totalMoney + product.price * product.quantity;
}
let shipping = 0
if ( totalMoney > 45) {
 shipping = 0;    
}
else if (totalMoney > 15){
    shipping = 2.99;
}
else if (totalMoney > 0){
    shipping = 4.99;
}

const Tax = totalMoney / 10;
const formatNumber = num => {
    const precision = num.toFixed(2)
    return Number(precision)
}

    return (
        <div>
            <h4>Order Summary</h4>
    <p>Items Ordered : {cart.length}</p>
    <p>Product Price : {totalMoney}</p> 
    <p>shipping Cost : {formatNumber(shipping)} </p>
    <p>Tax & Vat : {Tax}</p>
    <p>Total Price: {totalMoney + shipping + Tax}</p>

    {
        props.children
    }
        </div>
    );
};

export default Cart;