import React, { Fragment, useState, useEffect } from 'react';
import { Link , useParams } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, updateOrder, clearErrors } from '../../actions/orderActions';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';

const ProcessOrder = () => {

    const [status, setStatus] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();

    // to never have undefined values add {} for init order, this defined order with empty object for init
    // but we need this to don't have this type of error : "Cannot destructure property 'shippingInfo'..
    // ..of order as it is undefined"
    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order;
    const { error, isUpdated } = useSelector(state => state.order);

    const orderId = params.id;

    useEffect(() => {

        dispatch(getOrderDetails(orderId));

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success('Commande mise à jour avec succès !');
            dispatch({ type: UPDATE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isUpdated, orderId]);

    const updateOrderHandler = (id) => {

        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateOrder(id, formData))
    }

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true: false;

    return (
        <Fragment>
            <MetaData title={`Traitement de la commande # ${order && order._id}`} />
            <div className="d-flex">
                <div className="sidebar-navbar">
                    <Sidebar />
                </div>

                <div className="w-100 ml-4">
                    <Fragment>
                        {loading ?  <Loader /> : (
                            <div className="row d-flex justify-content-around" style={{marginBottom: "80px"}}>
                                <div className="col-12 col-lg-7 order-details">

                                    <h2 className="my-5 f-24">Commande # {order._id}</h2>

                                    <hr />

                                    <h4 className="mb-4 f-20">Informations d'expédition</h4>
                                    <p><b>Nom:</b> {user && user.name}</p>
                                    <p><b>Téléphone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>Adresse:</b> {shippingDetails}</p>
                                    <p><b>Montant:</b> {totalPrice}€</p>

                                    <hr />

                                    <h4 className="my-4 f-20">Paiement</h4>
                                    <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAYÉ" : "NON PAYÉ"}</b></p>

                                    <hr />

                                    <h4 className="my-4 f-20">ID Stripe</h4>
                                    <p><b>{paymentInfo && paymentInfo.id}</b></p>

                                    <hr />

                                    <h4 className="my-4 f-20">Statut de commande:</h4>
                                    <p className={order.orderStatus && String(order.orderStatus).includes('Livre') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>

                                    <hr />

                                    <h4 className="my-4 f-20">Produit(s):</h4>

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
                                                    <p>${item.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <p>{item.quantity} Pièce(s)</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4 f-20">Statut</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Traitement">Traitement</option>
                                            <option value="Expedie">Expédié</option>
                                            <option value="Livre">Livré</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
                                        Modifier
                                    </button>
                                </div>

                            </div>
                        )}
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProcessOrder