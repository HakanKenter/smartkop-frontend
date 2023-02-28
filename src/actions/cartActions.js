import axios from 'axios';
import { 
    ADD_TO_CART,
    REMOVE_ITEM_CART,
    REMOVE_ALL_ITEM_CART,
    SAVE_SHIPPING_INFO
} from "../constants/cartConstants";
import { URL } from '../urls'

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    // Store in localstorage because if we reload the page,
    // then we have to load all card item from local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeAllItemFromCart = () => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ALL_ITEM_CART,
        payload: []
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))
}