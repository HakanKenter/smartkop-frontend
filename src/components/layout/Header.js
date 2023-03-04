import React, { Fragment, useEffect, useState } from 'react'

import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link, useLocation } from 'react-router-dom'

import Search from './Search'

import { clearErrors, logout, updateUserCart } from '../../actions/userActions'
import { removeAllItemFromCart, addItemToCart } from '../../actions/cartActions';

const Header2 = () => {

    const alert= useAlert();
    const dispatch = useDispatch();
    const location = useLocation();

    let allCartItems = [];

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)
    const { error } = useSelector(state => state.user)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, error, cartItems])


    const logoutHandler = (e) => {

        if (cartItems) {

            if(cartItems && cartItems.length > 0) {
                cartItems.forEach(item => {
                    allCartItems.push({ product: item.product, quantity: item.quantity });
                })
            }

            const formData = new FormData();
            formData.append('allCartItems', JSON.stringify(allCartItems));
            dispatch(updateUserCart(formData))
        }

        dispatch(removeAllItemFromCart());
        dispatch(logout());

        alert.success('Déconnecté avec succès !');
    }

    return (

        <header className="section-header">
            <section className="header-main">
                <div className="container">
                    <div className="row gy-3 align-items-center">
                        <div className="col-lg-2 col-sm-4 col-4">
                            <Link className="navbar-brand" to="/" onClick={() => {window.location.href="/"}}>
                                <img src="/images/smartkop.jpeg" alt="logo" />
                            </Link>
                        </div>
                        <div className="order-lg-last col-lg-3 col-sm-8 col-8">
                            <div className="float-end">
                                <Link className="btn btn-light" to="/cart" >
                                    <i className="fa fa-shopping-cart"></i>
                                    <span className="ml-1 text-primary border-1 border-primary" id="cart_count" >{cartItems.length}</span>
                                </Link>

                                {user ? (
                       
                                    <Dropdown className="ml-4 d-inline dropdown-header-btn">
                                        <Dropdown.Toggle className="dropdown-toggle text-white" id="dropdown-basic">
                                            <figure className="avatar avatar-nav">
                                                <img
                                                    src={user.avatar && user.avatar.url}
                                                    alt={user && user.name}
                                                    className="rounded-circle"
                                                    style={{ height: "39px"}}
                                                />
                                            </figure>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>

                                            {user && user.role === 'admin' && (
                                                <Link className="dropdown-item" to="/dashboard">Tableau de bord</Link>
                                            )}
                                            <Link className="dropdown-item" to="/orders/me">Commandes</Link>
                                            <Link className="dropdown-item" to="/me">Profil</Link>
                                            <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>Déconnexion</Link>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    

                                ): !loading && 
                                    <Link to="/login" className="btn btn-light">
                                        <i className="fa fa-user"></i>  <span className="ms-1 d-none d-sm-inline-block">Connexion  </span>
                                    </Link>
                                }

                            </div>
                        </div>

                        <div className="col-lg-7 col-md-12 col-12">
                            <Search />
                        </div>

                    </div>
                </div>
            </section>
            
            {location.pathname === "/" && (
                <nav className="subnavbar navbar navbar-light bg-gray-light navbar-expand-lg">
                    <div className="container">
                        <button className="navbar-toggler border" type="button" data-bs-toggle="collapse" data-bs-target="#navbar_main">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbar_main">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#newProduct">Nouveau</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link ps-0" href="#category-nav-block-recommended"> Recommandé </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#best-seller">Meilleures notes</a>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={`/products-search?search=carte`}>Carte graphique</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={`/products-search?search=macbook`}>Ordinateur</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={`/products-search?search=Casques`}>Casque</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )}
        </header>

    )
}

export default Header2