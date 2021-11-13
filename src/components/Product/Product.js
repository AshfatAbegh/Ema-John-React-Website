import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';



const Product = (props) => {
    //console.log(props.product.key);
    const { name, img, seller, price, stock, key } = props.product;
    return (
        <div className="product" >
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name"> <Link to={"/product/" + key}>{name}</Link> </h4>
                <p>by: {seller}</p>
                <h4>${price}</h4>
                <h6>available  {stock} , order soon</h6>

                { props.showAddToCart === true &&
                    <button className="main-btn" onClick={() => props.handleClick(props.product)} >   Add to cart</button>
                }
            </div>


        </div>
    );
};

export default Product;