import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions';

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector(state => state.cart)

    const removeCartItemHandler = (id) => dispatch(removeItemFromCart(id))
 
    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;

        if (newQty > stock) return;

        dispatch(addItemToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {

        const newQty = quantity - 1;

        if (newQty <= 0) return;

        dispatch(addItemToCart(id, newQty))

    }

    const checkoutHandler = () => {
        navigate('/shipping')
    }


    return (
        <Fragment>
            <MetaData title="Votre panier" />
            {cartItems.length === 0 ? <h2 className="mt-5 mb-5 text-center f-24">Votre panier est vide</h2> : (
                <Fragment>
                    <h2 className="mt-5 f-24">Votre panier: <b>{cartItems.length} produit(s)</b></h2>
        
                    <div className="row d-flex justify-content-between cart-block">
                        <div className="col-12 col-lg-8 allcart-items">

                        {cartItems.map(item => (
                            <Fragment key={item.product}>
                                <hr />

                                <div className="cart-item">
                                    <div className="row">
                                        <a className="col-4 col-lg-3" href={`/product/${item.product}`}>
                                            <img src={item.image} alt="Laptop" height="90" width="115" />
                                        </a>

                                        <div className="item-in-cart title-item-cart col-5 col-lg-3">
                                            <a href={`/product/${item.product}`}>{item.name}</a>
                                        </div>

                                        <div className="item-in-cart col-12 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">{item.price}€</p>
                                        </div>

                                        <div className="item-in-cart col-6 col-lg-3 mt-4 mt-lg-0">
                                            <div className="stockCounter input-group input-spinner">
                                                <button className="btn btn-icon btn-light" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24" onClick={() => decreaseQty(item.product, item.quantity)}>
                                                        <path d="M19 13H5v-2h14v2z"></path>
                                                    </svg>
                                                </button>
                                                <input type="number" className="form-control text-center quantity-input count" style={{ border: "1px solid #dee2e6" }} value={item.quantity} readOnly />
                                                <button className="btn btn-icon btn-light" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>
                                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div> 

                                        <div className="item-in-cart col-6 col-lg-1 mt-4 mt-lg-0">
                                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)}></i>
                                        </div>

                                    </div>
                                </div>
                                <hr />
                            </Fragment>
                        ))}

                            
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4 className="f-20">Résumé de la commande</h4>
                                <hr />
                                <p>Sous-total:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Unités)</span></p>
                                <p>Total: <span className="order-summary-values">{cartItems.reduce((acc, item) => acc + Number(item.quantity) * item.price, 0).toFixed(2)}€</span></p>
                
                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Payer</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart 