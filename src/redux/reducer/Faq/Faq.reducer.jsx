import {
    toastError,
    toastSuccess,
  } from "../../../components/Utility/ToastUtils";
  // import * as CONTACTINFO from "../../actions/ContactInfo/ContactInfo.actions";
  import * as FAQ from "../../actions/Faq/Faq.action";
  
  const initialState = {
    faqs: null,
    faqObj: null,
    loading: false,
    error: null,
  };
  
  export const faqReducer = (state = initialState, action) => {
    // console.log(action, "reduscer");
    switch (action.type) {
      case FAQ.FAQ_ADD:
        return {
          ...state,
          loading: true,
        };
      case FAQ.FAQ_ADD_SUCCESS:
        toastSuccess(action.payload);
        // console.log(action, "reducer");
  
        return {
          ...state,
          loading: false,
        };
  
      case FAQ.FAQ_ADD_FAIL:
        toastError(action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case FAQ.GET_ALL_FAQ:
        return {
          ...state,
          loading: true,
        };
      case FAQ.GET_ALL_FAQ_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          faqs: action.payload.data,
        };
      case FAQ.GET_ALL_FAQ_FAIL:
        toastError(action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case FAQ.DELETE_FAQ_BY_ID:
        return {
          ...state,
          loading: true,
        };
      case FAQ.DELETE_FAQ_BY_ID_SUCCESS:
        toastSuccess(action.payload);
        return {
          ...state,
          loading: false,
          error: null,
        };
      case FAQ.DELETE_FAQ_BY_ID_FAIL:
        toastError(action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case FAQ.SET_FAQ_OBJ:
        return {
          ...state,
          loading: true,
        };
      case FAQ.SET_FAQ_OBJ_SUCCESS:
        toastSuccess(action.payload.message);
        return {
          ...state,
          faqObj: action.payload.data,
          loading: false,
          error: null,
        };
      case FAQ.SET_FAQ_OBJ_FAIL:
        toastError(action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case FAQ.UPDATE_FAQ_BY_ID:
        return {
          ...state,
          loading: true,
        };
      case FAQ.UPDATE_FAQ_BY_ID_SUCCESS:
        toastSuccess(action.payload.message);
        return {
          ...state,
          loading: false,
          error: null,
        };
      case FAQ.UPDATE_FAQ_BY_ID_FAIL:
        toastError(action.payload.data);
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  