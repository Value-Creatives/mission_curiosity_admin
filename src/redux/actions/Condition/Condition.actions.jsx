import { addCondition, deleteConditionById, getConditions, updateConditionById } from "../../../services/termCondition.service";

export const CONDITION_ADD = "CONDITION_ADD";
export const CONDITION_ADD_SUCCESS = "CONDITION_ADD_SUCCESS";
export const CONDITION_ADD_FAIL = "CONDITION_ADD_FAIL";

export const GET_ALL_CONDITIONS = "GET_ALL_CONDITIONS";
export const GET_ALL_CONDITIONS_SUCCESS = "GET_ALL_CONDITIONS_SUCCESS";
export const GET_ALL_CONDITIONS_FAIL = "GET_ALL_CONDITIONS_FAIL";

export const UPDATE_CONDITION_BY_ID = "UPDATE_CONDITION_BY_ID";
export const UPDATE_CONDITION_BY_ID_SUCCESS = "UPDATE_CONDITION_BY_ID_SUCCESS";
export const UPDATE_CONDITION_BY_ID_FAIL = "UPDATE_CONDITION_BY_ID_FAIL";

export const SET_CONDITION_OBJ = "SET_CONDITION_OBJ";
export const SET_CONDITION_OBJ_SUCCESS = "SET_CONDITION_OBJ_SUCCESS";
export const SET_CONDITION_OBJ_FAIL = "SET_CONDITION_OBJ_FAIL";

export const GET_CONDITION_BY_ID = "GET_CONDITION_BY_ID";
export const GET_CONDITION_BY_ID_SUCCESS = "GET_CONDITION_BY_ID_SUCCESS";
export const GET_CONDITION_BY_ID_FAIL = "GET_CONDITION_BY_ID_FAIL";

export const DELETE_CONDITION_BY_ID = "DELETE_CONDITION_BY_ID";
export const DELETE_CONDITION_BY_ID_SUCCESS = "DELETE_CONDITION_BY_ID_SUCCESS";
export const DELETE_CONDITION_BY_ID_FAIL = "DELETE_CONDITION_BY_ID_FAIL";

export const CONDITIONAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CONDITION_ADD });
    let { data: response } = await addCondition(formData);
    if (response) {
      //console.log(response);
      dispatch({
        type: CONDITION_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: CONDITION_ADD_FAIL, payload: err });
  }
};

export const CONDITIONGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CONDITIONS });
    let { data: response } = await getConditions(formData);
    if (response) {
      //console.log(response);
      dispatch({
        type: GET_ALL_CONDITIONS_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: CONDITION_ADD_FAIL, payload: err });
  }
};

export const SetCONDITIONObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_CONDITION_OBJ });
    if (formData) {
      dispatch({
        type: SET_CONDITION_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_CONDITION_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_CONDITION_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const CONDITIONUpdate = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CONDITION_BY_ID });
    let { data: response } = await updateConditionById(formData, id);
    if (response) {
      //console.log(response);
      dispatch({
        type: UPDATE_CONDITION_BY_ID_SUCCESS,
        payload: response
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_CONDITION_BY_ID_FAIL, payload: err });
  }
};

export const CONDITIONDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CONDITION_BY_ID });
    let { data: response } = await deleteConditionById(id);
    if (response) {
      //console.log(response);
      dispatch({
        type: DELETE_CONDITION_BY_ID_SUCCESS,
        payload: { message: response.message },
      });
      dispatch(CONDITIONGet);
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_CONDITION_BY_ID_FAIL, payload: err });
  }
};
