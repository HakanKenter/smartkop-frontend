import React, { Fragment, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'

import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

import axios from 'axios'
import { removeAllItemFromCart } from '../../actions/cartActions'
import { updateProduct } from '../../actions/productActions'

const options = {
    style: {    
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = () => {

    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)

    
    const order = {
        orderItems: cartItems,
        shippingInfo
    }
    
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }
    
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])
    
    
    const submitHandler = async (e) => {
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true;

        let res;
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret;

            console.log(clientSecret);

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                alert.error(result.error.message);
                document.querySelector('#pay_btn').disabled = false;
            } else {

                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(removeAllItemFromCart());
                    dispatch(createOrder(order));

                    await order.orderItems.forEach(product => {
                        const formData = new FormData();
                        formData.set('stock', (product.stock - product.quantity));	
                    
                        dispatch(updateProduct(product.product, formData))
                    
                    })
                    

                    navigate('/success')
                } else {
                    alert.error('Il y a un problème avec le traitement du paiement.')
                }
            }


        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.response.data.message)
        }
    }

    return (
        <Fragment>
            <MetaData title={'Paiement'} />

            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4 text-center f-22">Information bancaire</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Numéro de carte</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Expiration de la carte</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block mt-4 py-3"
                        >
                            Payer {` - ${orderInfo && orderInfo.totalPrice}€`}
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment
