import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as CLIENT from "../../actions/Client/Client.actions";

const initialState = {
  clients: null,
  clientObj: null,
  loading: false,
  error: null,
};

export const ClientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLIENT.CLIENT_ADD:
      return {
        ...state,
        loading: true,
      };
    case CLIENT.CLIENT_ADD_SUCCESS:
      //   console.log(act);
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case CLIENT.CLIENT_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLIENT.GET_ALL_CLIENTS:
      return {
        ...state,
        loading: true,
      };
    case CLIENT.GET_ALL_CLIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        clients: action.payload.data,
      };
    case CLIENT.GET_ALL_CLIENTS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    case CLIENT.UPDATE_CLIENT_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case CLIENT.UPDATE_CLIENT_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CLIENT.UPDATE_CLIENT_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLIENT.DELETE_CLIENT_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case CLIENT.DELETE_CLIENT_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CLIENT.DELETE_CLIENT_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLIENT.SET_CLIENT_OBJ:
      return {
        ...state,
        loading: true,
      };
    case CLIENT.SET_CLIENT_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        clientObj: action.payload.data,
        loading: false,
        error: null,
      };
    case CLIENT.SET_CLIENT_OBJ_FAIL:
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
