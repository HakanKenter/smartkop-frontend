import React, { Fragment, useEffect, useState } from 'react'
import Product from '../product/Product'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../actions/productActions'
import { useAlert } from 'react-alert';
import Loader from './Loader';
import MetaData from './MetaData';

const Landing = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0) 

    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();

    const { loading, products, error, resPerPage, productsCount, filteredProductsCount } = useSelector(state => state.products)
    const keyword = params.keyword
    const recommendeds = []
    const topRatings = []
    const mostComment = []
    
    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        
        dispatch(getAllProducts());

    }, [dispatch, alert, error])

    if (products && productsCount > 0) {
        let ratings = products.sort((a, b) => {
            return b.ratings - a.ratings
        })
        topRatings.push(ratings)

        products.forEach((product) => {
            if (product.category && product.category === "Ordinateur portable") {
                recommendeds.push(product)
            } 
        })

        let comment = products.sort((a, b) => {
            return b.reviews.length - a.reviews.length
        })
        mostComment.push(comment)
    }


    return (

        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Accueil'} />

                    <div className="home-section">

                        <section className="section-intro pt-3">
                            <div className="container">

                                <div className="row gx-3">
                                    <main className="col-lg-9">
                                        <article className="card-banner p-5 " style={{ height: "350px", background: "#232f3e" }}>
                                            <div style={{ maxWidth: "500px" }}>
                                                <h2 className="text-white">Les meilleurs produits<br /> pour les meilleures affaires </h2>
                                                <p className="text-white">Smartkop vous offre une large gamme de produits électroniques.</p>
                                                <Link to="/products-search" className="btn btn-warning border-0"> Voir </Link>
                                            </div>
                                        </article>
                                    </main>
                                    <aside className="good-things col-lg-3">
                                        <article className="card-banner h-100" style={{ background: "#fa9c23" }}>
                                            <div className="card-body text-center">
                                                <h5 className="mt-3 text-white">Très bonnes affaires !</h5>
                                                <p className="text-white">Peu importe la catégorie de produits, vous trouverez des prix défiant toutes concurrences.</p>
                                                <Link to="/products-search" className="btn btn-outline-light"> Voir </Link>
                                            </div>
                                        </article>
                                    </aside>
                                </div>

                            </div>
                        </section>


                        <section className="padding-top">
                            <nav className="container">
                                <div className="row">

                                    <div className="category-nav-block d-flex" style={{ width: "100%"}}>
                                        <div className="all-category-overflow-navbar">
                                            <a href={`/products-search?search=photo`} className="item-link text-center">
                                                <span className="icon mb-2 icon-md rounded">
                                                    <i width="32" height="32" className="fa fa-camera"></i>

                                                </span>
                                                <span className="text"> Appareils photo </span>
                                                
                                            </a>
                                        </div>
                                        <div className="all-category-overflow-navbar">
                                            <a href={`/products-search?search=macbook`} className="item-link text-center">
                                                <span className="icon mb-2 icon-md rounded">
                                                    <i width="32" height="32" className="fa fa-laptop"></i>
                                                </span>
                                                <span className="text"> Ordinateur </span>
                                                
                                            </a>
                                        </div>
                                        <div className="all-category-overflow-navbar">
                                            <a href={`/products-search?search=accessoire`} className="item-link text-center">
                                                <span className="icon mb-2 icon-md rounded">
                                                    <i width="32" height="32" className="fa fa-keyboard-o"></i>
                                                </span>
                                                <span className="text"> Accessoires </span>

                                            </a>
                                        </div>
                                        <div className="all-category-overflow-navbar">
                                            <a href={`/products-search?search=casque`} className="item-link text-center">
                                                <span className="icon mb-2 icon-md rounded">
                                                    <i width="32" height="32" className="fa fa-headphones"></i>
                                                </span>
                                                <span className="text"> Casques </span>
                                            </a>
                                        </div>
                                        <div className="all-category-overflow-navbar">
                                            <a href={`/products-search?search=LED`} className="item-link text-center">
                                                <span className="icon mb-2 icon-md rounded">
                                                    <i width="32" height="32" className="fa fa-lightbulb-o"></i>
                                                </span>
                                                <span className="text"> LED </span>
                                            </a>
                                        </div>
                                        <div className="all-category-overflow-navbar">
                                            <a href={`/products-search?search=graphique`} className="item-link text-center">
                                                <span className="icon mb-2 icon-md rounded">
                                                    <i width="32" height="32" className="fa fa-database"></i>
                                                </span>
                                                <span className="text"> Carte graphique </span>

                                            </a>
                                        </div>
                                        <div className="all-category-overflow-navbar">
                                            <a href={`/products-search?search=usb`} className="item-link text-center">
                                                <span className="icon mb-2 icon-md rounded">
                                                    <i width="32" height="32" className="fa fa-usb"></i>
                                                </span>
                                                <span className="text"> USB </span>

                                            </a>
                                        </div>
                                        <div className="all-category-overflow-navbar">
                                            <a href={`/products-search?search=chargeur`} className="item-link text-center">
                                                <span className="icon mb-2 icon-md rounded">
                                                    <i width="32" height="32" className="fa fa-battery-full"></i>
                                                </span>
                                                <span className="text"> Chargeur </span>

                                            </a>
                                        </div>
                                        <div className="all-category-overflow-navbar">
                                            <a href={`/products-search?search=tablette`} className="item-link text-center">
                                                <span className="icon mb-2 icon-md rounded">
                                                    <i width="32" height="32" className="fa fa-tablet"></i>
                                                </span>
                                                <span className="text"> Tablette </span>
                                            </a>
                                        </div>
                                        <div className="all-category-overflow-navbar">
                                            <a href={`/products-search?search=carte`} className="item-link text-center">
                                                <span className="icon mb-2 icon-md rounded">
                                                    <i width="32" height="32" className="fa fa-history"></i>
                                                </span>
                                                <span className="text"> Carte mémoire </span>

                                            </a>
                                        </div>
                                        <div className="all-category-overflow-navbar">
                                            <a href={`/products-search?search=smartphone`} className="item-link text-center">
                                                <span className="icon mb-2 icon-md rounded">
                                                    <i width="32" height="32" className="fa fa-mobile"></i>
                                                </span>
                                                <span className="text"> Smartphone </span>

                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </section>


                        <section id="newProduct" className="padding-y">
                            <div className="container">

                                <header className="section-heading">
                                    <h3 className="section-title">Nouveau</h3>
                                </header>

                                <div className="row">

                                    {
                                        products && products.map((product, index) => (
                                            index < 12 && (
                                                <Product key={product._id} product={product} col={3} />  
                                            )
                                        ))
                                    }
                                    
                                </div>

                            </div>
                        </section>




                        <section>
                            <div className="container">
                                <article className="card p-4" style={{ backgroundColor: "#232f3e" }}>
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h4 className="mb-0 text-white">Meilleurs produits et prix dans la boutique !</h4>
                                            <p className="mb-0 text-white-50">Retrouvez vos marques préférées.</p>
                                        </div>
                                        <div className="col-auto"> <a className="btn btn-warning" style={{ background: "#fa9c23" }} href="products-search">Découvrir</a> </div>
                                    </div>
                                </article>
                            </div>
                        </section>

                        <section id="category-nav-block-recommended" style={{ marginTop: "40px" }}>
                            <div className="container">

                                <header className="section-heading">
                                    <h3 className="section-title">Recommandé</h3>
                                </header>

                                <div className="row">

                                    <div className="category-nav-block-recommended d-flex" style={{ width: "100%"}}>

                                        {
                                            recommendeds && recommendeds.map((product, index) => (
                                                index < 3 && (
                                                    <Product key={product._id} product={product} col={4} />  
                                                )
                                            ))
                                        }

                                    </div>

                                </div>

                            </div>
                        </section>

                        <hr style={{ margin: "40px" }} />

                        <section id="best-seller" className="best-seller">
                            <div className="container">

                                <header className="section-heading">
                                    <h3 className="section-title">Meilleurs Notes</h3>
                                </header>

                                <div className="row">

                                    {
                                        topRatings[0] && topRatings[0].map((product, index) => (
                                            index < 2 && (
                                                <Product key={product._id} product={product} col={6} />  
                                            )
                                        ))
                                    }

                                </div>

                            </div>
                        </section>

                        <hr style={{ margin: "40px" }} />

                        <section className="best-comment" style={{paddingBottom: "80px"}}>
                            <div className="container">

                                <header className="section-heading">
                                    <h3 className="section-title">Commentés le plus de fois</h3>
                                </header>

                                <div className="row">
                                    
                                    <div className="category-nav-block-most-commented d-flex" style={{ width: "100%"}}>
                                        {
                                            mostComment[0] && mostComment[0].map((product, index) => (
                                                index < 7 && (
                                                    <Product key={product._id} product={product} col={3} />  
                                                )
                                            ))
                                        }
                                    </div>

                                </div>

                            </div>
                        </section>

                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Landing