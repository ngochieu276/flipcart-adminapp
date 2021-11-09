import { productConstants } from "../actions/constant";
const initialProducts = {
  products: [],
};

export default (state = initialProducts, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
  }
  return state;
};
