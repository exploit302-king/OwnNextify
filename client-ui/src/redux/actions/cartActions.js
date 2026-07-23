import axios from 'axios';
import { setError, setLoading, setShippingCosts, cartItemAdd, cartItemRemoval, clearCart } from '../slices/cartSlice';
import apis from '../../config/apis';
import {priceCalculator} from "../../functions/func"

export const addCartItem = (id, qty) => async (dispatch) => {

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
			qty,
			price: newPrice
		};

		dispatch(cartItemAdd(itemToAdd)); 
	} catch (error) {
		dispatch(
			setError(error.response && error.response.data.message)
		);
	}
};

export const removeCartItem = (id) => async (dispatch) => {
	dispatch(setLoading(true));
	dispatch(cartItemRemoval(id));
};

export const setShipping = (value) => async (dispatch) => {
	dispatch(setShippingCosts(value));
};

export const resetCart = () => (dispatch) => {
	dispatch(clearCart());
};

//  const decreaseItem = (id) => {
// 		const item = cartItems.find((cartItem) => cartItem.id === id);
		
// 		if (item && item.qty > 1) {
// 			dispatch(addCartItem(id, item.qty - 1));  // Quantity decrease
// 			console.log('Item quantity decreased');
// 		} else {
// 			console.log('Item quantity is already 1, cannot decrease');
// 		}
// 	};
	