import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import ListReviews from '../review/ListReviews';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, newReview, clearErrors } from '../../actions/productActions';
import { addItemToCart } from '../../actions/cartActions';
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import { getProducts } from '../../actions/productActions'


const ProductDetails = () => {

    const [currentImage, setCurrentImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])

    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const navigate = useNavigate();

    const { loading, error, product } = useSelector(state => state.productDetails)
    const { user } = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview)

    const { loading: allProductLoading, products, error: allProductError, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const category = product && product.category
    const keyword = params.keyword

    useEffect(() => {
        dispatch(getProductDetails(params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (allProductError) {
            alert.error(allProductError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Commentaire ajouté avec succès !');
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getProducts(keyword, currentPage, price, category, rating));

    }, [dispatch, alert, error, reviewError, params.id, success, category])

    if (product && currentImage === null) {
        if (product.images) {
            setCurrentImage(product.images[0].url);
        }
    }

    const addToCart = () => {
        dispatch(addItemToCart(params.id, quantity));
        alert.success('Produit ajouté');
    }

    const increaseQty = () => {
        const count = document.querySelector('.count');

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {

        const count = document.querySelector('.count');

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }

    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }

    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating)
        formData.set('comment', comment);
        formData.set('productId', params.id)

        dispatch(newReview(formData));
    };

    const changeImages = (e, image) => {
        e.preventDefault();
        setCurrentImage(image)
    }

    return (

        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />

                    {product && (
                        <div className="home-section">


                            <section className="padding-y-sm">
                                <div className="container">

                                    <ol className="breadcrumb ondark mb-0">
                                        <li className="breadcrumb-item" style={{ background: "white", border: "none", color: "#9da1a7", cursor: "pointer" }} onClick={() => {window.location.href="/"}}>Précédent</li>
                                        <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
                                    </ol>

                                </div>
                            </section>



                            <section className="pb-4">
                                <div className="container">

                                    <div className="row">
                                        <aside className="col-lg-6 title-left-side">
                                            <article className="gallery-wrap">
                                                <div className="img-big-wrap img-thumbnail">
                                                    <img height="560" src={currentImage} alt={product.title} />
                                                </div>
                                                <div className="thumbs-wrap">
                                                    {product.images && product.images.map(image => (
                                                        <button key={product._id} type="button" className="item-thumb" onClick={(e) => changeImages(e, image.url)}>
                                                            <img width="60" height="60" src={image.url} alt={product.title} />
                                                        </button>
                                                    ))}
                                                </div>
                                            </article>
                                        </aside>
                                        <main className="col-lg-6 right-side-product-details">
                                            <article className="ps-lg-3 pt-lg-0 pt-5">
                                                <h4 className="title text-dark">{product.name}</h4>
                                                <div className="rating-wrap my-3">
                                                    <ul className="rating-stars">
                                                        <li style={{ width: "80%" }} className="stars-active"> <img src="assets/images/misc/stars-active.svg" alt="" /> </li>
                                                        <li> <img src="assets/images/misc/starts-disable.svg" alt="" /> </li>
                                                    </ul>
                                                    <div className="rating-outer">
                                                        <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                                                    </div>
                                                    <i className="dot"></i>
                                                    <span className="label-rating text-muted"> {product.numOfReviews} commentaire(s) </span>
                                                </div>

                                                <div className="mb-3">
                                                    <var className="price h5">{product.price}€ </var>
                                                    <span className="text-muted">/ par pièce</span>
                                                </div>

                                                <p>{product.description}</p>

                                                <hr />

                                                <p>Statut: <span id="stock_status" style={{ color: product.stock > 0 ? '#2bb04a' : '#e23a05' }}>{product.stock > 0 ? 'En Stock' : 'Rupture de stock'}</span></p>

                                                <hr />

                                                <p id="product_seller mb-3">Vendu par: <strong>{product.seller}</strong></p>

                                                <hr />

                                                <div className="row mb-4">

                                                    <div className="col-md-4 col-12 mb-3">
                                                        <label className="form-label d-block mb-2">Quantité</label>
                                                        <div className="input-group input-spinner">
                                                            <button className="btn btn-icon btn-light" type="button">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24" onClick={decreaseQty}>
                                                                    <path d="M19 13H5v-2h14v2z"></path>
                                                                </svg>
                                                            </button>
                                                            <input type="number" className="form-control text-center quantity-input count" style={{ "paddingLeft": "14px" }} value={quantity} readOnly />
                                                            <button className="btn btn-icon btn-light" type="button">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24" onClick={increaseQty}>
                                                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>

                                                <button type="button" id="cart_btn" className="btn btn-primary d-inline" disabled={product.stock === 0} onClick={addToCart}> <i className="me-1 fa fa-shopping-basket"></i> Ajouter au panier</button>

                                                {user ? <button id="review_btn" type="button" className="btn cart_btn" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>
                                                    Ajouter un commentaire
                                                </button>
                                                    :
                                                    <div className="alert alert-danger mt-5" type='alert'>Connectez-vous pour ajouter un commentaire.</div>
                                                }

                                            </article>
                                        </main>
                                    </div>

                                </div>
                            </section>

                            <section className="pt-4 bg-light border-top mt-lg-0 mt-5">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-8">

                                            <div className="card">
                                                <header className="card-header">
                                                    <ul className="nav nav-tabs card-header-tabs">
                                                        <li className="nav-item">
                                                            <a href="#" data-bs-target="#tab_specs" data-bs-toggle="tab" className="nav-link active">Description</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a href="#" data-bs-target="#tab_warranty" data-bs-toggle="tab" className="nav-link">Stock</a>
                                                        </li>
                                                    </ul>
                                                </header>
                                                <div className="tab-content">
                                                    <article id="tab_specs" className="tab-pane show active card-body">
                                                        <p>{product.description}</p>
                                                        <p>Catégorie: <strong>{product.category}</strong></p>
                                                    </article>
                                                    <article id="tab_warranty" className="tab-pane card-body">
                                                        <p>
                                                            Stock: {product.stock}<br />
                                                        </p>
                                                    </article>
                                                </div>
                                            </div>

                                        </div>
                                        <aside className="col-lg-4 mt-lg-0 mt-4">

                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Produits similaires</h5>

                                                    {allProductLoading ? <Loader /> : (
                                                        products && products.map(currentproduct => (
                                                            product._id !== currentproduct._id && 
                                                            currentproduct.category === category && (
                                                                <article className="itemside mb-3">
                                                                    <a href={`/product/${currentproduct._id}`} className="aside">
                                                                        <img src={currentproduct.images && currentproduct.images[0].url} width="96" height="96" className="img-md img-thumbnail" />
                                                                    </a>
                                                                    <div className="info">
                                                                        <a href={`/product/${currentproduct._id}`} className="title mb-1"> {currentproduct.name}</a>
                                                                        <strong className="price"> {currentproduct.price}€</strong>
                                                                    </div>
                                                                </article>
                                                            )
                                                        ))
                                                    )}

                                                </div>
                                            </div>

                                        </aside>
                                    </div>

                                    <br /><br />

                                </div>
                            </section>

                            <section className="mt-5 product-details-reviews">
                                {
                                    product.reviews && product.reviews.length > 0 &&
                                    (
                                        <ListReviews reviews={product.reviews} />
                                    )
                                }
                            </section>

                            <div className="row" style={{height: "70px"}}>
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Ajouter un commentaire</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body my-rating-modal">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea
                                                        name="review"
                                                        id="review" className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    >

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white review-add-btn" onClick={reviewHandler} data-dismiss="modal" aria-label="Close">Ajouter</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails