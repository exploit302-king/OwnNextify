import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  products: [],
  error: null,
  product: null,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state) =>{
      state.loading = true
    },
    setProducts: (state,{payload}) => {
      state.loading = false
      state.products = payload
    },
    setError: (state, {payload}) => {
      state.loading = false
      state.error = payload
    },
    setProduct: (state,{payload}) => {
      state.loading = false
      state.product = payload
    }
  }
})
export const {
  setLoading,
  setProducts,
  setError,
  setProduct
} = productSlice.actions

export default productSlice.reducer