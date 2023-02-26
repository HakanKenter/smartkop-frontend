import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from "mdbreact";

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { allOrders, clearErrors, deleteOrder } from '../../actions/orderActions'
import { DELETE_ORDER_SUCCESS } from '../../constants/orderConstants';

const OrdersList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Produit supprimé avec succès.');
            navigate('/admin/orders');
            dispatch({ type: DELETE_ORDER_SUCCESS })
        }

    }, [dispatch, alert, error, isDeleted, navigate])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'ID Commande',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No de Commande',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Montant',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Statut',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `${order.totalPrice} €`,
                status: order.orderStatus && String(order.orderStatus).includes('Livre')
                    ? <p style={{ color: '#2bb04a' }}>{order.orderStatus}</p>
                    : <p style={{ color: '#e23a05' }}>{order.orderStatus}</p>,
                actions: <Fragment>
                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'Les Commandes'} />
            <div className="d-flex">
                <div className="sidebar-navbar">
                    <Sidebar />
                </div>

                <div className="w-100 ml-4">
                    <Fragment>
                        <h1 className="my-5 f-24">Les Commandes</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                                searchLabel="Rechercher"
                                paginationLabel={['Précédent', 'Suivant']}
                                infoLabel={['Résultat', 'sur', 'sur', 'élément(s)']}
                                displayEntries={false}
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default OrdersList