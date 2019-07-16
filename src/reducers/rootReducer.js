import { Map } from 'immutable';
import productReducer from './productReducer';

const initialState = Map({

	products: new Map({
		fetching: false,
		data: [],
	}),
});

export default (state = initialState, action) => {
	state = state.update('products', (s) => productReducer(s, action));
    return state;
}