import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'


const OrderSuccess = () => {
    return (
        <Fragment>

            <MetaData title={'Succès de la commande'} />

            <div className="row justify-content-center mb-5">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/order_success.png" alt="Order Success" width="200" height="200" />

                    <h2 className="f-20">Votre commande a été passée avec succès.</h2>

                    <Link to="/orders/me">Voir mes commandes.</Link>
                </div>

            </div>

        </Fragment>
    )
}

export default OrderSuccess