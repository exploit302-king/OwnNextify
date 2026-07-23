import { createSlice } from "@reduxjs/toolkit";
import { updateWishlistLocalStorage } from '../../functions/wishFunc'

export const initialState = {
  loading: false,
  error: null,
  wishItems: JSON.parse(localStorage.getItem("wishItems")) ?? [],
};

export const WishSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    wishItemAdd: (state, { payload }) => {
      const existingItem = state.wishItems.find((item) => item.id === payload.id);

      if (existingItem) {
        state.wishItems = state.wishItems.map((item) => (item.id === existingItem.id ? payload : item));
      } else {
        state.wishItems = [...state.wishItems, payload];
      }
      state.loading = false;
      state.error = null;
      updateWishlistLocalStorage(state.wishItems);
    },

    wishItemRemoval: (state, { payload }) => {
      state.wishItems = [...state.wishItems].filter((item) => item.id !== payload);
      updateWishlistLocalStorage(state.wishItems); 
      state.loading = false;
      state.error = null;
    },

    clearWish: (state) => {
      localStorage.removeItem("wishItems");
      state.wishItems = [];
      state.loading = false;
      state.error = null;
    },
  },
});


export const { setError, setLoading, wishItemAdd, wishItemRemoval, clearWish } = WishSlice.actions;

export default WishSlice.reducer;

export const WishSelector = (state) => state.wishlist;