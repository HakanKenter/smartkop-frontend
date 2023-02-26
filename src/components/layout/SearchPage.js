import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import MetaData from '../layout/MetaData'
import Product from '../product/Product'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getAllProducts, getProducts } from '../../actions/productActions'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const SearchPage = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)
    const numberOfResultsPerPage = 6;  

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
    const location = useLocation();
    const navigate = useNavigate();

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    let keyword = location.search && location.search.split('=')[1]
    let pagination;

    useEffect(() => {

        if (error) {
            return alert.error(error)
        }
        
        dispatch(getProducts(keyword, currentPage, price, category, rating));

    }, [dispatch, alert, error, keyword, currentPage, price, category, rating])

    const handleCategory = (category) => {
        setCategory(category)
        setCurrentPage(1)
        
        if(category === 'Générale') {
            setCategory('');
            setPrice([1, 1000]);
            setRating(0);
        }
        
        navigate('/products-search')
    }

    const handlePrice = (price) => {
        setPrice(price)
        setCurrentPage(1)
    }

    const handleRating = (star) => {
        setRating(star)
        setCurrentPage(1)
    }

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount && productsCount;

    if (keyword) {
        count = filteredProductsCount
    }

    if (filteredProductsCount) {
        pagination = filteredProductsCount / numberOfResultsPerPage
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
                    <MetaData title={"Recerche de produit"} />

                    <div className="home-section">

                        <section className="padding-y-sm">
                            <div className="container">
                                <ol className="breadcrumb ondark mb-0">
                                    <li className="breadcrumb-item" style={{ background: "white", border: "none", color: "#9da1a7", cursor: "pointer" }} onClick={() => navigate(-1)}>Précédent</li>
                                    <li className="breadcrumb-item active" aria-current="page">Produits</li>
                                </ol>
                            </div>
                        </section>



                        <section className="pb-4">
                            <div className="container">

                                <div className="row">
                                    <aside className="col-lg-3">

                                        <button class="btn btn-outline-secondary mb-3 w-100  d-lg-none" data-bs-toggle="collapse" data-bs-target="#aside_filter">Voir les filtres</button>

                                        <div id="aside_filter" className="collapse card d-lg-block mb-5">

                                            <article className="filter-group">
                                                <header className="card-header">
                                                    <h6 className="title filter-title" data-bs-toggle="collapse" data-bs-target="#collapse_aside1">
                                                        Catégories
                                                    </h6>
                                                </header>
                                                <div className="collapse show" id="collapse_aside1">
                                                    <div className="card-body">
                                                        <ul className="list-menu">
                                                            {categories.map(category => (
                                                                <li
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        listStyleType: 'none'
                                                                    }}
                                                                    key={category}
                                                                    onClick={() => handleCategory(category)}
                                                                >
                                                                    {category}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </article>

                                            <article className="filter-group">
                                                <header className="card-header">
                                                    <h6 className="title filter-title" data-bs-toggle="collapse" data-bs-target="#collapse_aside2">
                                                        Prix
                                                    </h6>
                                                </header>
                                                <div className="collapse show" id="collapse_aside2">

                                                    <Range
                                                        className="mx-auto"
                                                        marks={{
                                                            1: `1€`,
                                                            1000: `1000€`
                                                        }}
                                                        min={1}
                                                        max={1000}
                                                        defaultValue={[1, 1000]}
                                                        tipFormatter={value => `${value}`}
                                                        tipProps={{
                                                            placement: "top",
                                                            visible: true
                                                        }}
                                                        value={price}
                                                        onChange={price => handlePrice(price)}
                                                    />

                                                </div>
                                            </article>

                                            <article className="filter-group">
                                                <header className="card-header">
                                                    <h6 className="title filter-title" data-bs-toggle="collapse" data-bs-target="#collapse_aside3">
                                                        Note
                                                    </h6>
                                                </header>
                                                <div className="collapse show" id="collapse_aside3">

                                                    <ul className="pl-0">
                                                        {[5, 4, 3, 2, 1].map(star => (
                                                            <li
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    listStyleType: 'none'
                                                                }}
                                                                key={star}
                                                                onClick={() => handleRating(star)}
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
                                            </article>



                                        </div>


                                    </aside>
                                    <main className="col-lg-9">

                                        <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                                            {filteredProductsCount && filteredProductsCount > 0 ? (
                                                <strong className="d-block py-2">{`${filteredProductsCount} Produit(s) trouvé(s)`} </strong>
                                            ) : (
                                                ''
                                            )
                                            }
                                        </header>


                                        <div className="row">
                                            {products &&  products.length > 0 ? products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            )) : 
                                                <h5 className='pb-4'>Aucun produit trouvé.</h5>
                                            }
                                        </div>

                                        <hr />

                                        {pagination > 1 && (

                                            <div className="pagination-block d-flex justify-content-center mt-5 mb-5 col-12 mx-auto">
                                                <Pagination
                                                    style={{width: '100%'}}
                                                    activePage={currentPage}
                                                    itemsCountPerPage={resPerPage}
                                                    totalItemsCount={filteredProductsCount}
                                                    onChange={setCurrentPageNo}
                                                    nextPageText={'Suivant'}
                                                    prevPageText={'Précédent'}
                                                    firstPageText={'Début'}
                                                    lastPageText={'Fin'}
                                                    itemClass="page-item"
                                                    linkClass="page-link"
                                                />
                                            </div>
                                            
                                        )}

                                    </main>
                                </div>

                            </div>
                        </section>


                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}

export default SearchPage