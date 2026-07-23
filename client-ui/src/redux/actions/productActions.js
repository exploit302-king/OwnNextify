import {
  setError, setLoading, setProduct, setProducts
} from '../slices/productSlice';

import apis from '../../config/apis';
import axios from "axios";

export const fetchProducts = () => async (dispatch) => {

  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(apis[1]);
    const { products } = data;
    dispatch(setProducts(products))
  } catch (error) {
    dispatch(setError(error.message))
  }

}
export const fetchProduct = (id) => async (dispatch) => {

  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${apis[1]}/${id} `);

    console.log( "Product action:" + response && response.data);
    dispatch(setProduct(response.data)) 
  } catch (error) {
    dispatch(setError(error.message))
  }

}

