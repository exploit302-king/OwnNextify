import { configureStore, combineReducers } from '@reduxjs/toolkit';
import products from './slices/productSlice'
import carts from './slices/cartSlice'
import wishlist from './slices/WishSlice'
// passing reducers

const reducer = combineReducers({
  productSlice: products,
  cartSlice: carts,
  WishSlice: wishlist
  });


const store = configureStore({reducer});

export default store;