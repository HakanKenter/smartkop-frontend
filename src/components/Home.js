import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions'
import { useParams } from 'react-router-dom';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const categories = [
        "Générale",
        "Electronique",
        "Appareils photo",
        "Camera",
        "Ordinateur portable",
        "Accessoires",
        "Casques",
        "Ordinateur",
        "Carte graphique",
        "Carte mémoire",
        "USB",
        "Chargeur",
        "LED",
        "Tablette",
        "Smartphone"
    ]

    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const keyword = params.keyword

    useEffect(() => {

        if (error) {
            return alert.error(error)
        }

        if(keyword) {
            setCurrentPage(1);
        }

        if(category === 'Générale') {
            setCategory('');
        }

        dispatch(getProducts(keyword, currentPage, price, category, rating));
        // dispatch(getProducts(keyword, currentPage, price, category, rating));

    }, [dispatch, alert, error, keyword, currentPage, price, category, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount;

    if (keyword) {
        count = filteredProductsCount
    }

    function noProduct() {
        if (products && products.length == 0) {
            setTimeout(() => {
                return (<h3>Le produit cherché n'a pas été trouvé.</h3>)
            }, 100);
        }
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Achetez le meilleur de l'électronique"} />

                    {/* <h1 id="products_heading">Nouveau</h1> */}

                    <section id="products" className="container mt-5">
                        <div className="row">

                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-5">
                                            <Range
                                                marks={{
                                                    1: `$1`,
                                                    1000: `$1000`
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <hr className="my-5" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Catégories
                                                </h4>

                                                <ul className="pl-0">
                                                    {categories.map(category => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={category}
                                                            onClick={() => setCategory(category)}
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <hr className="my-3" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Note
                                                </h4>

                                                <ul className="pl-0">
                                                    {[5, 4, 3, 2, 1].map(star => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={star}
                                                            onClick={() => setRating(star)}
                                                        >
                                                            <div className="rating-outer">
                                                                <div className="rating-inner"
                                                                style={{
                                                                    width: `${star * 20}%`
                                                                }}
                                                                >
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <hr className="my-3" />

                                        </div>
                                    </div>

                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products && products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                        <div className="row">
                                            {products && products.length == 0 && (
                                                <h3>Le produit cherché n'a pas été trouvé.</h3>
                                            )}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                    products && products.map(product => (
                                        <Product key={product._id} product={product} col={3} />
                                    ))
                                )}

                        </div>
                    </section>

                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}

                </Fragment>
            )}

        </Fragment>
    )
}

export default Home