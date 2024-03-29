import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, deleteReview, clearErrors } from '../../actions/productActions'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'

const ProductReviews = () => {

    const [productId, setProductId] = useState('')
    const [reviewError, setReviewError] = useState(null);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, reviews } = useSelector(state => state.productReviews);
    const { isDeleted, error: deleteError } = useSelector(state => state.review)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }
        
        if (isDeleted) {
            alert.success('Commentaire supprimé avec succès !');
            dispatch({ type: DELETE_REVIEW_RESET })
        }    

    }, [dispatch, alert, error, productId, isDeleted, deleteError])


        
    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'ID Commentaire',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Notation',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Commentaire',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Utilisateur',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions:
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(review._id)} >
                        <i className="fa fa-trash"></i>
                    </button>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'Commentaire produit'} />
            <div className="d-flex">
                <div className="sidebar-navbar">
                    <Sidebar />
                </div>

                <div className="w-100 ml-4">
                    <Fragment>
                        <div className="row justify-content-center mt-5">
                            <div className="id-product-search">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="productId_field">Entrez un ID de produit</label>
                                        <input
                                            type="text"
                                            id="productId_field"
                                            className="form-control"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                    >
                                        Rechercher
								    </button>
                                </ form>
                            </div>

                        </div>

                        {reviews && reviews.length > 0 ? (
                            <MDBDataTable
                                data={setReviews()}
                                className="px-3"
                                bordered
                                striped
                                hover
                                searchLabel="Rechercher"
                                paginationLabel={['Précédent', 'Suivant']}
                                infoLabel={['Résultat', 'sur', 'sur', 'élément(s)']}
                                displayEntries={false}
                            />
                        ) : (
                                <p className="mt-5 text-center">Pas de commentaire.</p>
                            )}


                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProductReviews
