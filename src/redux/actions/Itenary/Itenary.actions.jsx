import { addItenary, deleteItenaryById, getItenarys, updateItenaryById } from "../../../services/itenary.service";

export const ITENARY_ADD = "ITENARY_ADD";
export const ITENARY_ADD_SUCCESS = "ITENARY_ADD_SUCCESS";
export const ITENARY_ADD_FAIL = "ITENARY_ADD_FAIL";

export const GET_ALL_ITENARYS = "GET_ALL_ITENARYS";
export const GET_ALL_ITENARYS_SUCCESS = "GET_ALL_ITENARYS_SUCCESS";
export const GET_ALL_ITENARYS_FAIL = "GET_ALL_ITENARYS_FAIL";

export const UPDATE_ITENARY_BY_ID = "UPDATE_ITENARY_BY_ID";
export const UPDATE_ITENARY_BY_ID_SUCCESS = "UPDATE_ITENARY_BY_ID_SUCCESS";
export const UPDATE_ITENARY_BY_ID_FAIL = "UPDATE_ITENARY_BY_ID_FAIL";

export const SET_ITENARY_OBJ = "SET_ITENARY_OBJ";
export const SET_ITENARY_OBJ_SUCCESS = "SET_ITENARY_OBJ_SUCCESS";
export const SET_ITENARY_OBJ_FAIL = "SET_ITENARY_OBJ_FAIL";

export const GET_ITENARY_BY_ID = "GET_ITENARY_BY_ID";
export const GET_ITENARY_BY_ID_SUCCESS = "GET_ITENARY_BY_ID_SUCCESS";
export const GET_ITENARY_BY_ID_FAIL = "GET_ITENARY_BY_ID_FAIL";

export const DELETE_ITENARY_BY_ID = "DELETE_ITENARY_BY_ID";
export const DELETE_ITENARY_BY_ID_SUCCESS = "DELETE_ITENARY_BY_ID_SUCCESS";
export const DELETE_ITENARY_BY_ID_FAIL = "DELETE_ITENARY_BY_ID_FAIL";

// export const GET_ALL_NESTED_CATEGORIES = "GET_ALL_NESTED_CATEGORIES";
// export const GET_ALL_NESTED_CATEGORIES_SUCCESS = "GET_ALL_NESTED_CATEGORIES_SUCCESS";
// export const GET_ALL_NESTED_CATEGORIES_FAIL = "GET_ALL_NESTED_CATEGORIES_FAIL";

export const ITENARYAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ITENARY_ADD });
    let { data: response } = await addItenary(formData);
    if (response) {
      //console.log(response);
      dispatch({
        type: ITENARY_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: ITENARY_ADD_FAIL, payload: err });
  }
};

export const ITENARYGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ITENARYS });
    let { data: response } = await getItenarys(formData);
    if (response) {
      //console.log(response);
      dispatch({
        type: GET_ALL_ITENARYS_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: ITENARY_ADD_FAIL, payload: err });
  }
};

export const SetITENARYObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_ITENARY_OBJ });
    if (formData) {
      dispatch({
        type: SET_ITENARY_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_ITENARY_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_ITENARY_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const ITENARYUpdate = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ITENARY_BY_ID });
    let { data: response } = await updateItenaryById(formData, id);
    if (response) {
      //console.log(response);
      dispatch({
        type: UPDATE_ITENARY_BY_ID_SUCCESS,
        payload: response
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_ITENARY_BY_ID_FAIL, payload: err });
  }
};

export const ITENARYDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ITENARY_BY_ID });
    let { data: response } = await deleteItenaryById(id);
    if (response) {
      //console.log(response);
      dispatch({
        type: DELETE_ITENARY_BY_ID_SUCCESS,
        payload: { message: response.message },
      });
      dispatch(ITENARYGet);
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_ITENARY_BY_ID_FAIL, payload: err });
  }
};
