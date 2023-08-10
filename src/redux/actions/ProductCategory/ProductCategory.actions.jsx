import { addProductCategory, deleteProductCategory, getProductCategory, updateProductCategory } from "../../../services/productCategory.service";

export const PRODUCT_CATEGORY_ADD = "PRODUCT_CATEGORY_ADD";
export const PRODUCT_CATEGORY_ADD_SUCCESS = "PRODUCT_CATEGORY_ADD_SUCCESS";
export const PRODUCT_CATEGORY_ADD_FAIL = "PRODUCT_CATEGORY_ADD_FAIL";

export const GET_ALL_PRODUCT_CATEGORYS = "GET_ALL_PRODUCT_CATEGORYS";
export const GET_ALL_PRODUCT_CATEGORYS_SUCCESS = "GET_ALL_PRODUCT_CATEGORYS_SUCCESS";
export const GET_ALL_PRODUCT_CATEGORYS_FAIL = "GET_ALL_PRODUCT_CATEGORYS_FAIL";

export const UPDATE_PRODUCT_CATEGORY_BY_ID = "UPDATE_PRODUCT_CATEGORY_BY_ID";
export const UPDATE_PRODUCT_CATEGORY_BY_ID_SUCCESS = "UPDATE_PRODUCT_CATEGORY_BY_ID_SUCCESS";
export const UPDATE_PRODUCT_CATEGORY_BY_ID_FAIL = "UPDATE_PRODUCT_CATEGORY_BY_ID_FAIL";

export const SET_PRODUCT_CATEGORY_OBJ = "SET_PRODUCT_CATEGORY_OBJ";
export const SET_PRODUCT_CATEGORY_OBJ_SUCCESS = "SET_PRODUCT_CATEGORY_OBJ_SUCCESS";
export const SET_PRODUCT_CATEGORY_OBJ_FAIL = "SET_PRODUCT_CATEGORY_OBJ_FAIL";

export const GET_PRODUCT_CATEGORY_BY_ID = "GET_PRODUCT_CATEGORY_BY_ID";
export const GET_PRODUCT_CATEGORY_BY_ID_SUCCESS = "GET_PRODUCT_CATEGORY_BY_ID_SUCCESS";
export const GET_PRODUCT_CATEGORY_BY_ID_FAIL = "GET_PRODUCT_CATEGORY_BY_ID_FAIL";

export const DELETE_PRODUCT_CATEGORY_BY_ID = "DELETE_PRODUCT_CATEGORY_BY_ID";
export const DELETE_PRODUCT_CATEGORY_BY_ID_SUCCESS = "DELETE_PRODUCT_CATEGORY_BY_ID_SUCCESS";
export const DELETE_PRODUCT_CATEGORY_BY_ID_FAIL = "DELETE_PRODUCT_CATEGORY_BY_ID_FAIL";

// export const GET_ALL_NESTED_CATEGORIES = "GET_ALL_NESTED_CATEGORIES";
// export const GET_ALL_NESTED_CATEGORIES_SUCCESS = "GET_ALL_NESTED_CATEGORIES_SUCCESS";
// export const GET_ALL_NESTED_CATEGORIES_FAIL = "GET_ALL_NESTED_CATEGORIES_FAIL";

export const PRODUCT_CATEGORYAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CATEGORY_ADD });
    let { data: response } = await addProductCategory(formData);
    if (response) {
      //console.log(response);
      dispatch({
        type: PRODUCT_CATEGORY_ADD_SUCCESS,
        payload: response.message,
      });
      dispatch(PRODUCT_CATEGORYGet())
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: PRODUCT_CATEGORY_ADD_FAIL, payload: err });
  }
};

export const PRODUCT_CATEGORYGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCT_CATEGORYS });
    let { data: response } = await getProductCategory(formData);
    if (response) {
      //console.log(response);
      dispatch({
        type: GET_ALL_PRODUCT_CATEGORYS_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: PRODUCT_CATEGORY_ADD_FAIL, payload: err });
  }
};

export const SetPRODUCT_CATEGORYObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_PRODUCT_CATEGORY_OBJ });
    if (formData) {
      dispatch({
        type: SET_PRODUCT_CATEGORY_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_PRODUCT_CATEGORY_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_PRODUCT_CATEGORY_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const PRODUCT_CATEGORYUpdate = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_CATEGORY_BY_ID });
    let { data: response } = await updateProductCategory(formData, id);
    if (response) {
      //console.log(response);
      dispatch({
        type: UPDATE_PRODUCT_CATEGORY_BY_ID_SUCCESS,
        payload: response.message,
      });
      dispatch(PRODUCT_CATEGORYGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_PRODUCT_CATEGORY_BY_ID_FAIL, payload: err });
  }
};

export const PRODUCT_CATEGORYDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_CATEGORY_BY_ID });
    let { data: response } = await deleteProductCategory(id);
    if (response) {
      //console.log(response);
      dispatch({
        type: DELETE_PRODUCT_CATEGORY_BY_ID_SUCCESS,
        payload: response
      });
      dispatch(PRODUCT_CATEGORYGet())
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_PRODUCT_CATEGORY_BY_ID_FAIL, payload: err });
  }
};

