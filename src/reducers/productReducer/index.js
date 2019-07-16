import { Map } from 'immutable';
import * as Types from '../../constants/products';

const initialState = new Map({
    fetching: false,
    data: [],
});

export default (state = initialState, action) => {
    switch (action.type){
        case Types.FETCH_PRODUCTS:
            state = state.update('fetching', () => true);
            return state;

        case Types.SUCCESS_FETCH_PRODUCTS:
            state = state.update('fetching', () => false);
            state = state.update('data', () => action.data);
            return state;
        case Types.CHANGE_PRODUCTS:
            state = state.update('data', () => action.data);
            return state;

        case Types.FAILURE_FETCH_PRODUCTS:
            state = state.update('fetching', () => false);
            return state;

        default:
            return state
    }
}
