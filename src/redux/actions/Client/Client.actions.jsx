import {
    addClient,
    deleteClient,
    getClient,
    updateClient,
  } from "../../../services/client.service";
  
  export const CLIENT_ADD = "CLIENT_ADD";
  export const CLIENT_ADD_SUCCESS = "CLIENT_ADD_SUCCESS";
  export const CLIENT_ADD_FAIL = "CLIENT_ADD_FAIL";
  
  export const GET_ALL_CLIENTS = "GET_ALL_CLIENTS";
  export const GET_ALL_CLIENTS_SUCCESS = "GET_ALL_CLIENTS_SUCCESS";
  export const GET_ALL_CLIENTS_FAIL = "GET_ALL_CLIENTS_FAIL";
  
  export const UPDATE_CLIENT_BY_ID = "UPDATE_CLIENT_BY_ID";
  export const UPDATE_CLIENT_BY_ID_SUCCESS = "UPDATE_CLIENT_BY_ID_SUCCESS";
  export const UPDATE_CLIENT_BY_ID_FAIL = "UPDATE_CLIENT_BY_ID_FAIL";
  
  export const SET_CLIENT_OBJ = "SET_CLIENT_OBJ";
  export const SET_CLIENT_OBJ_SUCCESS = "SET_CLIENT_OBJ_SUCCESS";
  export const SET_CLIENT_OBJ_FAIL = "SET_CLIENT_OBJ_FAIL";
  
  export const GET_CLIENT_BY_ID = "GET_CLIENT_BY_ID";
  export const GET_CLIENT_BY_ID_SUCCESS = "GET_CLIENT_BY_ID_SUCCESS";
  export const GET_CLIENT_BY_ID_FAIL = "GET_CLIENT_BY_ID_FAIL";
  
  export const DELETE_CLIENT_BY_ID = "DELETE_CLIENT_BY_ID";
  export const DELETE_CLIENT_BY_ID_SUCCESS = "DELETE_CLIENT_BY_ID_SUCCESS";
  export const DELETE_CLIENT_BY_ID_FAIL = "DELETE_CLIENT_BY_ID_FAIL";
  
  export const CLIENTAdd = (formData) => async (dispatch) => {
    try {
      dispatch({ type: CLIENT_ADD });
      let { data: response } = await addClient(formData);
      if (response) {
        console.log(response);
        dispatch({
          type: CLIENT_ADD_SUCCESS,
          payload: response.message,
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: CLIENT_ADD_FAIL, payload: err });
    }
  };
  
  export const CLIENTGet = (formData) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_CLIENTS });
      let { data: response } = await getClient(formData);
      if (response) {
        console.log(response);
        dispatch({
          type: GET_ALL_CLIENTS_SUCCESS,
          payload: { data: response.data, message: response.message },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: CLIENT_ADD_FAIL, payload: err });
    }
  };
  
  export const SetCLIENTObj = (formData) => async (dispatch) => {
    try {
      dispatch({ type: SET_CLIENT_OBJ });
      if (formData) {
        dispatch({
          type: SET_CLIENT_OBJ_SUCCESS,
          payload: { data: formData },
        });
      } else {
        dispatch({
          type: SET_CLIENT_OBJ_SUCCESS,
          payload: { data: null },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: SET_CLIENT_OBJ_FAIL, payload: { message: "NOT FOUND" } });
    }
  };
  
  export const CLIENTUpdate = (formData, id) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_CLIENT_BY_ID });
      let { data: response } = await updateClient(formData, id);
      if (response) {
        console.log(response);
        dispatch({
          type: UPDATE_CLIENT_BY_ID_SUCCESS,
          payload: response,
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: UPDATE_CLIENT_BY_ID_FAIL, payload: err });
    }
  };
  
  export const CLIENTDelete = (formData, id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_CLIENT_BY_ID });
      let { data: response } = await deleteClient(formData, id);
      if (response) {
        console.log(response, "response");
        dispatch({
          type: DELETE_CLIENT_BY_ID_SUCCESS,
          payload: response,
        });
        CLIENTGet();
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: DELETE_CLIENT_BY_ID_FAIL, payload: err });
    }
  };
  