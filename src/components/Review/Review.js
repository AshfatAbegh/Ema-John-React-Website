import React from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useState } from 'react';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyShopping from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart , setCart] = useState([])
    const history = useHistory()
    const [orderPlaced, setOrderPlaced] = useState(false)
    const HandleProceedChekOut = ()=>{
        history.push('/shipment')
    }


    const removeProduct = (productKey) => {
        console.log("clikced", productKey);
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

useEffect(() => {
    const saveCart = getDatabaseCart()

    const productKeys = Object.keys(saveCart);
    const cartProducts = productKeys.map( key => {
        const product = fakeData.find(pd => pd.key === key )
        product.quantity = saveCart[key]
        return product
    })
   setCart (cartProducts)
} , [])
let thankYou;
if(orderPlaced){
     thankYou = <img style = {{width : "70%", marginLeft  :"100px" }} src={happyShopping} alt=""/>
}

    return (
       <div className ="shop-container" >
            <div className ="product-container">
                <h1>This is Review Part: {cart.length}</h1>
                {
                    cart.map(pd => <ReviewItem removeProduct = {removeProduct} product = {pd}></ReviewItem> )
                }
                {
                    thankYou
                }
        </div>
        <div style={{width:"25%"}} className = "cart-container">
            <Cart cart={cart}>
                <button onClick = {HandleProceedChekOut}  className = "main-btn">Proceed CheckOut</button>
            </Cart>
        </div>
       </div>
    );
};

export default Review;