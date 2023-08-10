import { addPrivacy, deletePrivacyById, getPrivacys, updatePrivacyById } from "../../../services/privacy.service";

export const PRIVACY_ADD = "PRIVACY_ADD";
export const PRIVACY_ADD_SUCCESS = "PRIVACY_ADD_SUCCESS";
export const PRIVACY_ADD_FAIL = "PRIVACY_ADD_FAIL";

export const GET_ALL_PRIVACYS = "GET_ALL_PRIVACYS";
export const GET_ALL_PRIVACYS_SUCCESS = "GET_ALL_PRIVACYS_SUCCESS";
export const GET_ALL_PRIVACYS_FAIL = "GET_ALL_PRIVACYS_FAIL";

export const UPDATE_PRIVACY_BY_ID = "UPDATE_PRIVACY_BY_ID";
export const UPDATE_PRIVACY_BY_ID_SUCCESS = "UPDATE_PRIVACY_BY_ID_SUCCESS";
export const UPDATE_PRIVACY_BY_ID_FAIL = "UPDATE_PRIVACY_BY_ID_FAIL";

export const SET_PRIVACY_OBJ = "SET_PRIVACY_OBJ";
export const SET_PRIVACY_OBJ_SUCCESS = "SET_PRIVACY_OBJ_SUCCESS";
export const SET_PRIVACY_OBJ_FAIL = "SET_PRIVACY_OBJ_FAIL";

export const GET_PRIVACY_BY_ID = "GET_PRIVACY_BY_ID";
export const GET_PRIVACY_BY_ID_SUCCESS = "GET_PRIVACY_BY_ID_SUCCESS";
export const GET_PRIVACY_BY_ID_FAIL = "GET_PRIVACY_BY_ID_FAIL";

export const DELETE_PRIVACY_BY_ID = "DELETE_PRIVACY_BY_ID";
export const DELETE_PRIVACY_BY_ID_SUCCESS = "DELETE_PRIVACY_BY_ID_SUCCESS";
export const DELETE_PRIVACY_BY_ID_FAIL = "DELETE_PRIVACY_BY_ID_FAIL";

export const PRIVACYAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: PRIVACY_ADD });
    let { data: response } = await addPrivacy(formData);
    if (response) {
      //console.log(response);
      dispatch({
        type: PRIVACY_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: PRIVACY_ADD_FAIL, payload: err });
  }
};

export const PRIVACYGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRIVACYS });
    let { data: response } = await getPrivacys(formData);
    if (response) {
      //console.log(response);
      dispatch({
        type: GET_ALL_PRIVACYS_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: PRIVACY_ADD_FAIL, payload: err });
  }
};

export const SetPRIVACYObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_PRIVACY_OBJ });
    if (formData) {
      dispatch({
        type: SET_PRIVACY_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_PRIVACY_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_PRIVACY_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const PRIVACYUpdate = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRIVACY_BY_ID });
    let { data: response } = await updatePrivacyById(formData, id);
    if (response) {
      //console.log(response);
      dispatch({
        type: UPDATE_PRIVACY_BY_ID_SUCCESS,
        payload: response
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_PRIVACY_BY_ID_FAIL, payload: err });
  }
};

export const PRIVACYDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRIVACY_BY_ID });
    let { data: response } = await deletePrivacyById(id);
    if (response) {
      //console.log(response);
      dispatch({
        type: DELETE_PRIVACY_BY_ID_SUCCESS,
        payload: { message: response.message },
      });
      dispatch(PRIVACYGet);
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_PRIVACY_BY_ID_FAIL, payload: err });
  }
};
