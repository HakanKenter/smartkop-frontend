import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addItemToCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const Product = ({ product, col }) => {

    const alert = useAlert();

    const dispatch = useDispatch();

    const [hover, setHover] = useState(false);

    const addToCart = () => {
        if (product.stock > 0) {
            dispatch(addItemToCart(product._id, 1));
            alert.success('Produit ajouté');    
        } else {
            alert.error('Ce produit ne peut être ajouté. (Rupture de stock)');
        }
    }

    return (
        <div 
            className={`col-lg-${col} col-md-6 col-sm-6`}
        >
            
            <figure 
                onMouseOver={() => setHover(true)} 
                onMouseOut={() => setHover(false)} 
                className="card-product-grid"
            >
                <a href={`/product/${product._id}`} className="img-wrap rounded bg-gray-light">
                    
                    { 
                    product && product.images && product.images[1] && product.images[0].url && hover ? 
                        <img height="250" className="mix-blend-multiply" src={product.images[1].url} />
                    : 
                        <img height="250" className="mix-blend-multiply" src={product.images[0].url} />  
                    }

                </a>
                <figcaption className="pt-2">
                    <a href={`/product/${product._id}`} className={product.stock === 0 ? 'float-end btn btn-icon ml-1' : 'float-end btn btn-light btn-icon ml-1'} style={ product.stock === 0 ? { color: "#e23a05", border: "0.5px solid #e23a05"}  : {}}> <i className="fa fa-eye"></i>  </a>
                    <a href="#" className={product.stock === 0 ? 'float-end btn btn-icon' : 'float-end btn btn-light btn-icon'} disabled={product.stock === 0} onClick={addToCart} style={ product.stock === 0 ? { color: "#e23a05", border: "0.5px solid #e23a05"}  : {}}> <i className="fa fa-shopping-cart"></i> </a>
                    <strong className="price">{product.price}€</strong>
                    <a href={`/product/${product._id}`} className="title text-truncate product-title" style={{ textDecoration: "none" }}>{product.name}</a>
                    <div className="w-100 d-flex justify-content-between mb-4">
                        <span className="d-flex align-items-center stock-details" style={{ color: product.stock > 0 ? "#2bb04a" : "#e23a05" }}>{product.stock > 0 ? "En stock" : "Rupture"}</span>
                        <div className="ratings mt-auto">
                            <small className="text-muted mx-2">{product.numOfReviews} Commentaire(s)</small>
                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%`}}></div>
                            </div>
                        </div>
                    </div>
                </figcaption>
            </figure>
        </div>
    )
}

export default Product