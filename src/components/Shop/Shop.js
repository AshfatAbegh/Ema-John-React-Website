import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Shop = () => {
    const firstTenItems = fakeData.slice(0, 10)
    const [products, setProducts] = useState(firstTenItems)

    const [cart, setCart] = useState([])
    useEffect(() => {
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart)
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey)
            product.quantity = saveCart[existingKey]
            return product;
        })
        setCart(previousCart)
        //   console.log(previousCart);
    }, [])


    const handleClick = (product) => {
        setProducts(products)
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, product]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }

        setCart(newCart)


        addToDatabaseCart(product.key, count)

    }


    return (
        <div className="shop-container">
            <div className="product-container">


                {
                    products.map(ConProoduct => <Product
                        key={ConProoduct.key}
                        showAddToCart={true}
                        handleClick={handleClick} product={ConProoduct} ></Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                     <Link to="/review"> <button className="orderClass main-btn"
                >Confirm Order</button>
                     </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;