import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from "mdbreact";

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors } from '../../actions/orderActions'


const ListOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert()

    const { loading, error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, error]);

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'ID Commande', 
                    field: 'id',
                    sort: 'asc' 
                },
                {
                    label: 'N. de Commandes', 
                    field: 'numOfItems',
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
                    sort: 'asc' 
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `${order.totalPrice} €`,
                status: order.orderStatus && String(order.orderStatus).includes('Livre')
                        ? <p style={{ color: '#2bb04a' }}>{order.orderStatus}</p>
                        : <p style={{ color: '#e23a05' }}>{order.orderStatus}</p>,
                actions:
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
            
            })
        })

        return data;
    }

    return (
        <Fragment>

            <MetaData title={'Mes Commandes'} />

            <h1 className="text-center f-24 m-60">Mes Commandes</h1> 

            {loading? (
                <Loader />
            ) : (
                <MDBDataTable
                    data={setOrders()}
                    className="px-3 mt-5 mb-5 my-order-table"
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
    )
}

export default ListOrders