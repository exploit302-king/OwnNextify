// src/redux/reducers/cartReducer.js
const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.payload.id) };
    case 'RESET_CART':
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

export default cartReducer;