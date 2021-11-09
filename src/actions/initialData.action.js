import axios from "../helper/axios";
import { categoryConstant, orderConstants, productConstants } from "./constant";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.post("/initialData");

    if (res.status === 200) {
      const { categories, products, orders } = res.data;
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
    }
  };
};
