import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as Itenary from "../../actions/Itenary/Itenary.actions";

const initialState = {
  itenarys: null,
  itenaryObj: null,
  loading: false,
  error: null,
};

export const ItenaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case Itenary.ITENARY_ADD:
      return {
        ...state,
        loading: true,
      };
    case Itenary.ITENARY_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case Itenary.ITENARY_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Itenary.UPDATE_ITENARY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case Itenary.UPDATE_ITENARY_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
      };
    case Itenary.UPDATE_ITENARY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };



    case Itenary.GET_ALL_ITENARYS:
      return {
        ...state,
        loading: true,
      };
    case Itenary.GET_ALL_ITENARYS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        itenarys: action.payload.data,
      };
    case Itenary.GET_ALL_ITENARYS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Itenary.DELETE_ITENARY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case Itenary.DELETE_ITENARY_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Itenary.DELETE_ITENARY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Itenary.SET_ITENARY_OBJ:
      return {
        ...state,
        loading: true,
      };
    case Itenary.SET_ITENARY_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        itenaryObj: action.payload.data,
        loading: false,
        error: null,
      };
    case Itenary.SET_ITENARY_OBJ_FAIL:
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
