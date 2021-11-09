import { authConstant, userConstant } from "./constant";
import axios from "../helper/axios";

export const signup = (user) => {
  console.log(user);
  return async (dispatch) => {
    dispatch({ type: userConstant.USER_REGISTER_REQUEST });
    const res = await axios.post("/admin/signup", { ...user });

    if (res.status === 201) {
      const { message } = res.data;
      dispatch({
        type: userConstant.USER_REGISTER_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstant.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
