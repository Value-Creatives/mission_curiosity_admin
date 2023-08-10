import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as Condition from "../../actions/Condition/Condition.actions";

const initialState = {
  Conditions: null,
  ConditionObj: null,
  loading: false,
  error: null,
};

export const ConditionReducer = (state = initialState, action) => {
  switch (action.type) {
    case Condition.CONDITION_ADD:
      return {
        ...state,
        loading: true,
      };
    case Condition.CONDITION_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case Condition.CONDITION_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Condition.UPDATE_CONDITION_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case Condition.UPDATE_CONDITION_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
      };
    case Condition.UPDATE_CONDITION_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };



    case Condition.GET_ALL_CONDITIONS:
      return {
        ...state,
        loading: true,
      };
    case Condition.GET_ALL_CONDITIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        Conditions: action.payload.data,
      };
    case Condition.GET_ALL_CONDITIONS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Condition.DELETE_CONDITION_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case Condition.DELETE_CONDITION_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Condition.DELETE_CONDITION_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Condition.SET_CONDITION_OBJ:
      return {
        ...state,
        loading: true,
      };
    case Condition.SET_CONDITION_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        ConditionObj: action.payload.data,
        loading: false,
        error: null,
      };
    case Condition.SET_CONDITION_OBJ_FAIL:
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
