import axios from "../helper/axios";
import { authConstant, categoryConstant } from "./constant";

const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.GET_ALL_CATEGORIES_REQUEST });
    const res = await axios.get("/category/getCategory");
    console.log(res);

    if (res.status === 200) {
      const { categoriesList } = res.data;
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoriesList },
      });
    } else {
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: categoryConstant.ADD_NEW_CATEGORY_REQUEST });
      const res = await axios.post("/category/create", form);
      if (res.status === 201) {
        dispatch({
          type: categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
          payload: { category: res.data.category },
        });
      } else {
        dispatch({
          type: categoryConstant.ADD_NEW_CATEGORY_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.UPDATE_CATEGORIES_REQUEST });
    const res = await axios.post("/category/update", form);
    if (res.status === 201) {
      dispatch({ type: categoryConstant.UPDATE_CATEGORIES_SUCCESS });
      dispatch(getAllCategory());
    } else {
      dispatch({
        type: categoryConstant.UPDATE_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const deleteCategories = (ids) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.ADD_NEW_CATEGORY_REQUEST });
    const res = await axios.post("/category/delete", { payload: { ids } });
    if (res.status === 201) {
      dispatch({ type: categoryConstant.DELETE_CATEGORIES_SUCCESS });
      dispatch(getAllCategory());
    } else {
      dispatch({
        type: categoryConstant.DELETE_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export { getAllCategory };
