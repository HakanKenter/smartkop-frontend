import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ shipping, confirmOrder, payment}) => {
    return (
        // <div className="col-12">
            <div className="checkout-progress mt-5">

            {shipping ? <Link to='/shipping' className="float-right">
                <div className="step active-step">Expédition</div>
            </Link> : <Link to="#!" disabled>
                    <div className="step incomplete">Expédition</div>
                </Link>}

            {confirmOrder ? <Link to='/confirm' className="float-right">
                <div className="center-step step active-step">Confirmation commande</div>
            </Link> : <Link to="#!" disabled>
                    <div className="step incomplete">Confirmation commande</div>
                </Link>}

            {payment ? <Link to='/payment' className="float-right">
                <div className="step active-step">Paiement</div>
            </Link> : <Link to="#!" disabled>
                    <div className="step incomplete">Paiement</div>
                </Link>}
            </div>
        // </div>
        

    )
}

export default CheckoutSteps