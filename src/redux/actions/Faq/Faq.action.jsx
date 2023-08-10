import {
    addFaq,
    deleteFaq,
    getFaq,
    updateFaq,
  } from "../../../services/Faq.service";
  
  export const FAQ_ADD = "FAQ_ADD";
  export const FAQ_ADD_SUCCESS = "FAQ_ADD_SUCCESS";
  export const FAQ_ADD_FAIL = "FAQ_ADD_FAIL";
  
  export const GET_ALL_FAQ = "GET_ALL_FAQS";
  export const GET_ALL_FAQ_SUCCESS = "GET_ALL_FAQS_SUCCESS";
  export const GET_ALL_FAQ_FAIL = "GET_ALL_FAQS_FAIL";
  
  export const UPDATE_FAQ_BY_ID = "UPDATE_FAQ_BY_ID";
  export const UPDATE_FAQ_BY_ID_SUCCESS = "UPDATE_FAQ_BY_ID_SUCCESS";
  export const UPDATE_FAQ_BY_ID_FAIL = "UPDATE_FAQ_BY_ID_FAIL";
  
  export const SET_FAQ_OBJ = "SET_FAQ_OBJ";
  export const SET_FAQ_OBJ_SUCCESS = "SET_FAQ_OBJ_SUCCESS";
  export const SET_FAQ_OBJ_FAIL = "SET_FAQ_OBJ_FAIL";
  
  export const GET_FAQ_BY_ID = "GET_FAQ_BY_ID";
  export const GET_FAQ_BY_ID_SUCCESS = "GET_FAQ_BY_ID_SUCCESS";
  export const GET_FAQ_BY_ID_FAIL = "GET_FAQ_BY_ID_FAIL";
  
  export const DELETE_FAQ_BY_ID = "DELETE_FAQ_BY_ID";
  export const DELETE_FAQ_BY_ID_SUCCESS = "DELETE_FAQ_BY_ID_SUCCESS";
  export const DELETE_FAQ_BY_ID_FAIL = "DELETE_FAQ_BY_ID_FAIL";
  
  export const FaqAdd = (formData) => async (dispatch) => {
    try {
      dispatch({ type: FAQ_ADD });
      console.log(formData, "form raction ");
      let { data: response } = await addFaq(formData);
      if (response) {
        console.log(response, "response raction ");
        dispatch({
          type: FAQ_ADD_SUCCESS,
          payload: response.message,
        });
        dispatch(FAQGet());
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: FAQ_ADD_FAIL, payload: err });
    }
  };
  
  export const FAQGet = (formData) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_FAQ });
      let { data: response } = await getFaq(formData);
      if (response) {
        console.log(response, "action get  ");
        dispatch({
          type: GET_ALL_FAQ_SUCCESS,
          payload: { data: response.data, message: response.message },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: GET_ALL_FAQ_FAIL, payload: err });
    }
  };
  
  export const SetFaqObj = (formData) => async (dispatch) => {
    try {
      dispatch({ type: SET_FAQ_OBJ });
      if (formData) {
        console.log(formData, "formdAtaSetobj action");
        dispatch({
          type: SET_FAQ_OBJ_SUCCESS,
          payload: { data: formData },
        });
      } else {
        dispatch({
          type: SET_FAQ_OBJ_SUCCESS,
          payload: { data: null },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: SET_FAQ_OBJ_FAIL,
        payload: { message: "NOT FOUND" },
      });
    }
  };
  
  export const FaqUpdate = (formData, id) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_FAQ_BY_ID });
      console.log(formData, "formData", id, "id");
      let { data: response } = await updateFaq(formData, id);
      if (response) {
        console.log(response, "");
        dispatch({
          type: UPDATE_FAQ_BY_ID_SUCCESS,
          payload: response,
        });
        dispatch(FAQGet());
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: UPDATE_FAQ_BY_ID_FAIL, payload: err });
    }
  };
  
  export const FaqDelete = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_FAQ_BY_ID });
      let { data: response } = await deleteFaq(id);
      if (response) {
        console.log(response, "response daelete action ");
        dispatch({
          type: DELETE_FAQ_BY_ID_SUCCESS,
          payload: response.message,
        });
        dispatch(FAQGet());
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: DELETE_FAQ_BY_ID_FAIL, payload: err });
    }
  };
  