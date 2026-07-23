const initialState = {
  wishItems: [],
};

const wishReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, wishItems: [...state.wishItems, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, wishItems: state.wishItems.filter(item => item.id !== action.payload.id) };
    case 'RESET_WISH':
      return { ...state, wishItems: [] };
    default:
      return state;
  }
};

export default wishReducer;