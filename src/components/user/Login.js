import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../../actions/userActions'
import { addItemToCart } from '../../actions/cartActions';
import { UPDATE_USERCART_RESET } from '../../constants/userConstants';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuthenticated, error, loading, user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cart);
    const { isUpdated } = useSelector(state => state.user)

    // if have parameter get it after connection
    const redirect = location.search ? `/${location.search.split('=')[1]}` : '/'

    useEffect(() => {

        if (isAuthenticated) {
            if(user && user.cartItems && user.cartItems.length > 0 && cartItems) {
                user.cartItems.forEach(item => {
                    dispatch(addItemToCart(item.product, item.quantity));
                })
            }
            navigate(`${redirect}`);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated) {
            dispatch({ type: UPDATE_USERCART_RESET })
        }

    }, [dispatch, alert, isAuthenticated, error, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Connexion'} />
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg login-space" onSubmit={submitHandler}>
                                <h1 className="mb-3 f-24 text-center">Connexion</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Mot de passe</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <Link to="/password/forgot" className="float-right mb-4">Mot de passe oublié ?</Link>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    Connexion
                                </button>

                                <Link to="/register" className="float-right mt-3 not-register">Pas encore inscrit ?</Link>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Login