import { addCustomerCategory, deleteCustomerCategoryById, getCustomerCategory, updateCustomerCategoryById, } from "../../../services/CustomerCategory.service";

export const CUSTOMER_CATEGORY_ADD = "CUSTOMER_CATEGORY_ADD";
export const CUSTOMER_CATEGORY_ADD_SUCCESS = "CUSTOMER_CATEGORY_ADD_SUCCESS";
export const CUSTOMER_CATEGORY_ADD_FAIL = "CUSTOMER_CATEGORY_ADD_FAIL";

export const GET_ALL_CUSTOMER_CATEGORY = "GET_ALL_CUSTOMER_CATEGORY";
export const GET_ALL_CUSTOMER_CATEGORY_SUCCESS = "GET_ALL_CUSTOMER_CATEGORY_SUCCESS";
export const GET_ALL_CUSTOMER_CATEGORY_FAIL = "GET_ALL_CUSTOMER_CATEGORY_FAIL";

export const UPDATE_CUSTOMER_CATEGORY_BY_ID = "UPDATE_CUSTOMER_CATEGORY_BY_ID";
export const UPDATE_CUSTOMER_CATEGORY_BY_ID_SUCCESS = "UPDATE_CUSTOMER_CATEGORY_BY_ID_SUCCESS";
export const UPDATE_CUSTOMER_CATEGORY_BY_ID_FAIL = "UPDATE_CUSTOMER_CATEGORY_BY_ID_FAIL";

export const SET_CUSTOMER_CATEGORY_OBJ = "SET_CUSTOMER_CATEGORY_OBJ";
export const SET_CUSTOMER_CATEGORY_OBJ_SUCCESS = "SET_CUSTOMER_CATEGORY_OBJ_SUCCESS";
export const SET_CUSTOMER_CATEGORY_OBJ_FAIL = "SET_CUSTOMER_CATEGORY_OBJ_FAIL";

export const DELETE_CUSTOMER_CATEGORY_BY_ID = "DELETE_CUSTOMER_CATEGORY_BY_ID";
export const DELETE_CUSTOMER_CATEGORY_BY_ID_SUCCESS = "DELETE_CUSTOMER_CATEGORY_BY_ID_SUCCESS";
export const DELETE_CUSTOMER_CATEGORY_BY_ID_FAIL = "DELETE_CUSTOMER_CATEGORY_BY_ID_FAIL";

export const CustomerCategoryAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_CATEGORY_ADD });
    let { data: response } = await addCustomerCategory(formData);
    if (response) {
      // //console.log(response);
      dispatch({
        type: CUSTOMER_CATEGORY_ADD_SUCCESS,
        payload: response.message,
      });
      dispatch(CustomerCategoryGet())
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: CUSTOMER_CATEGORY_ADD_FAIL, payload: err });
  }
};

export const CustomerCategoryGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CUSTOMER_CATEGORY });
    let { data: response } = await getCustomerCategory(formData);
    if (response) {
      // //console.log(response);
      dispatch({
        type: GET_ALL_CUSTOMER_CATEGORY_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: CUSTOMER_CATEGORY_ADD_FAIL, payload: err });
  }
};

export const SetCustomerCategoryObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_CUSTOMER_CATEGORY_OBJ });
    if (formData) {
      dispatch({
        type: SET_CUSTOMER_CATEGORY_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_CUSTOMER_CATEGORY_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_CUSTOMER_CATEGORY_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const CustomerCategoryUpdate = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CUSTOMER_CATEGORY_BY_ID });
    let { data: response } = await updateCustomerCategoryById(formData, id);
    if (response) {
      dispatch({
        type: UPDATE_CUSTOMER_CATEGORY_BY_ID_SUCCESS,
        payload: response
      });
      dispatch(CustomerCategoryGet())
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_CUSTOMER_CATEGORY_BY_ID_FAIL, payload: err });
  }
};

export const CustomerCategoryDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CUSTOMER_CATEGORY_BY_ID });
    let { data: response } = await deleteCustomerCategoryById(id);
    if (response) {
      //console.log(response);
      dispatch({
        type: DELETE_CUSTOMER_CATEGORY_BY_ID_SUCCESS,
        payload: response
      });
      dispatch(CustomerCategoryGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_CUSTOMER_CATEGORY_BY_ID_FAIL, payload: err });
  }
};
