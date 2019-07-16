import * as Types from '../constants/products';
import {CALL_API} from '../middleware/api';

export function fetchProducts() {
    return (dispatch) => dispatch({
        type: Types.FETCH_PRODUCTS,
        [ CALL_API ]: {
            endpoint: `/api/v1/product/`,
            method: 'get',
            types: [
                Types.SUCCESS_FETCH_PRODUCTS,
                Types.FAILURE_FETCH_PRODUCTS
            ]
        }
    });
}

export function changeProducts(products) {
    const shuffledProducts = products.sort(()=>Math.random())
    for(var i=0;i<3;i++) {
        let randomNum = Math.floor(Math.random() * 10);
        products[randomNum] ={
            id: shuffledProducts[i].id,
            name: shuffledProducts[i].name,
            description: shuffledProducts[i].description
        }
    }
    return (dispatch) => dispatch({
        type: Types.CHANGE_PRODUCTS,
        data: products
    });
}