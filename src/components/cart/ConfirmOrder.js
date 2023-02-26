import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useSelector } from 'react-redux'

const ConfirmOrder = () => {

    const navigate = useNavigate()

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    // Calculate Order price
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }

    return (
        <Fragment>

            <MetaData title={'Confirmation Commande'} />

            <CheckoutSteps shipping confirmOrder />

            <div className="row d-flex justify-content-between cart-block">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3 f-20">Information d'expédition</h4>
                    <p><b>Nom:</b> {user && user.name}</p>
                    <p><b>Téléphone:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Adresse:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

                    <hr />
                    <h4 className="mt-4 f-20">Vos produits:</h4>

                    {cartItems.map((item) => (
                        <Fragment key={item.product}>
                            <hr />
                            <div className="cart-item my-1">
                                <div className="row">
                                    <a className="col-4 col-lg-2" href={`/product/${item.product}`}>
                                        <img src={item.image} alt="Laptop" height="45" width="65" />
                                    </a>

                                    <div className="col-5 col-lg-6">
                                        <a href={`/product/${item.product}`}>{item.name}</a>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x {item.price}€ = <b>{(item.quantity * item.price).toFixed(2)}€</b></p>
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
                        <p>Sous-total:  <span className="order-summary-values">{itemsPrice.toFixed(2)}€</span></p>
                        <p>Expédition: <span className="order-summary-values">{shippingPrice}€</span></p>
                        <p>Taxe:  <span className="order-summary-values">{taxPrice}€</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">{totalPrice}€</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Procéder au paiement</button>
                    </div>
                </div>


            </div>

        </Fragment>
    )
}

export default ConfirmOrder