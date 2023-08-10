import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as Privacy from "../../actions/Privacy/Privacy.actions";

const initialState = {
  Privacys: null,
  PrivacyObj: null,
  loading: false,
  error: null,
};

export const PrivacyReducer = (state = initialState, action) => {
  switch (action.type) {
    case Privacy.PRIVACY_ADD:
      return {
        ...state,
        loading: true,
      };
    case Privacy.PRIVACY_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case Privacy.PRIVACY_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Privacy.UPDATE_PRIVACY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case Privacy.UPDATE_PRIVACY_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
      };
    case Privacy.UPDATE_PRIVACY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };



    case Privacy.GET_ALL_PRIVACYS:
      return {
        ...state,
        loading: true,
      };
    case Privacy.GET_ALL_PRIVACYS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        Privacys: action.payload.data,
      };
    case Privacy.GET_ALL_PRIVACYS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Privacy.DELETE_PRIVACY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case Privacy.DELETE_PRIVACY_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Privacy.DELETE_PRIVACY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Privacy.SET_PRIVACY_OBJ:
      return {
        ...state,
        loading: true,
      };
    case Privacy.SET_PRIVACY_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        PrivacyObj: action.payload.data,
        loading: false,
        error: null,
      };
    case Privacy.SET_PRIVACY_OBJ_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
