import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from "mdbreact";

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, clearErrors, deleteProduct } from '../../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductsList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            navigate('/admin/products');
            alert.success('Produit supprimé avec succès !');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, navigate])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Nom',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Prix',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `${product.price}€`,
                stock: product.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }

    return (
        <Fragment>
            <MetaData title={'Les produits'} />
            <div className="d-flex">
                <div className="sidebar-navbar">
                    <Sidebar />
                </div>

                <div className="w-100 ml-4">
                    <Fragment>
                        <h1 className="my-5 f-24">Les produits</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                                searchLabel="Rechercher"
                                paginationLabel={['Précédent', 'Suivant']}
                                infoLabel={['Résultat', 'sur', 'sur', 'élément(s)']}
                                displayEntries={false}
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProductsList