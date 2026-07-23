import axios from 'axios';
import { setError, setLoading, wishItemAdd, wishItemRemoval, clearWish } from '../slices/WishSlice';
import apis from '../../config/apis';
import {priceCalculator} from "../../functions/func"

export const addWishItem = (id) => async (dispatch) => {

	dispatch(setLoading(true));
	try {
		const { data } = await axios.get(`${apis[1]}/${id}`);
    
		const {_id, title, brand, price, subtitle, image, stock , category, onSale, discount } = data;
		const newPrice = priceCalculator(price, onSale, discount)
		const itemToAdd = {
			id: _id,
			name: title,
			subtitle: subtitle,
			image: image,
			stock: stock,
			brand: brand,
      category: category,
			discount: discount,
			price: newPrice
		};

		dispatch(wishItemAdd(itemToAdd)); 
	} catch (error) {
		dispatch(
			setError(error.response && error.response.data.message)
		);
	}
};

export const removeWishItem = (id) => async (dispatch) => {
	dispatch(setLoading(true));
	dispatch(wishItemRemoval(id));
};

// export const setShipping = (value) => async (dispatch) => {
// 	dispatch(setShippingCosts(value));
// };

export const resetWish = () => (dispatch) => {
	dispatch(clearWish());
};