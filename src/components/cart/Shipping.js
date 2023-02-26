import React, { Fragment, useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { countries } from 'countries-list'

import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartActions';

const Shipping = () => {

    const countriesList = Object.values(countries)

    const { shippingInfo } = useSelector((state) => state.cart)
    const { isAuthenticated } = useSelector(state => state.auth);

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country) 

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }))
        navigate('/confirm')
    }

    useEffect(() => {
        if(!isAuthenticated) {
            navigate('/login?redirect=shipping');
        }
    }, [isAuthenticated, navigate]);

    return (
        <Fragment>

            <MetaData title="Information d'expédition" />

            <CheckoutSteps shipping />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4 text-center f-22">Information d'expédition</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Adresse</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">Ville</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Numéro de téléphone</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Code postal</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Pays</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                {countriesList.map((country) => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block mt-4 py-3"
                        >
                            CONTINUER
                            </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping