import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as CustomerCategory from "../../actions/CustomerCategory/CustomerCategory.actions";

const initialState = {
  customerCategory: null,
  customerCategoryObj: null,
  loading: false,
  error: null,
};

export const CustomerCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CustomerCategory.CUSTOMER_CATEGORY_ADD:
      return {
        ...state,
        loading: true,
      };
    case CustomerCategory.CUSTOMER_CATEGORY_ADD_SUCCESS:
      //   console.log(act);
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case CustomerCategory.CUSTOMER_CATEGORY_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CustomerCategory.GET_ALL_CUSTOMER_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case CustomerCategory.GET_ALL_CUSTOMER_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        customerCategory: action.payload.data,
      };
    case CustomerCategory.GET_ALL_CUSTOMER_CATEGORY_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CustomerCategory.UPDATE_CUSTOMER_CATEGORY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case CustomerCategory.UPDATE_CUSTOMER_CATEGORY_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CustomerCategory.UPDATE_CUSTOMER_CATEGORY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CustomerCategory.DELETE_CUSTOMER_CATEGORY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case CustomerCategory.DELETE_CUSTOMER_CATEGORY_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CustomerCategory.DELETE_CUSTOMER_CATEGORY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CustomerCategory.SET_CUSTOMER_CATEGORY_OBJ:
      return {
        ...state,
        loading: true,
      };
    case CustomerCategory.SET_CUSTOMER_CATEGORY_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        customerCategoryObj: action.payload.data,
        loading: false,
        error: null,
      };
    case CustomerCategory.SET_CUSTOMER_CATEGORY_OBJ_FAIL:
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
