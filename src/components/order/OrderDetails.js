import React, { Fragment, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, clearErrors } from '../../actions/orderActions'

const OrderDetails = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();

    const { loading, error, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

    useEffect(() => {
        dispatch(getOrderDetails(params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <MetaData title={'Détails Commande'} />

            {loading ? <Loader /> : (
                <Fragment>
                    <div className="row d-flex justify-content-between mb-5">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5 f-24">Commande # {order._id}</h1>

                            <hr />

                            <h4 className="mb-4 f-20">Information d'expédition</h4>
                            <p><b>Nom:</b> {user && user.name}</p>
                            <p><b>Téléphone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Adresse: </b>{shippingDetails}</p>
                            <p><b>Montant:</b> {totalPrice}€</p>

                            <hr />

                            <h4 className="my-4 f-20">Paiement</h4>
                            <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAYÉ" : "NON PAYÉ"}</b></p>

                            <hr />

                            <h4 className="my-4 f-20">Statut de la commande:</h4>
                            <p className={order.orderStatus && String(order.orderStatus).includes('Livre') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>

                            <hr />
                            <h4 className="my-4 f-20">Commandes:</h4>

                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item => (
                                    <div key={item.product} className="row my-5">
                                        <a className="col-4 col-lg-2" href={`/product/${item.product}`}>
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </a>

                                        <div className="col-5 col-lg-5">
                                            <a href={`/product/${item.product}`}>{item.name}</a>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>{item.price}€ </p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} Pièce(s)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                        </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default OrderDetails
