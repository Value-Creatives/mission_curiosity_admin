import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as ProductCategory from "../../actions/ProductCategory/ProductCategory.actions";

const initialState = {
  productCategories: null,
  productCategoryObj: null,
  loading: false,
  error: null,
};

export const ProductCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductCategory.PRODUCT_CATEGORY_ADD:
      return {
        ...state,
        loading: true,
      };
    case ProductCategory.PRODUCT_CATEGORY_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case ProductCategory.PRODUCT_CATEGORY_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ProductCategory.GET_ALL_PRODUCT_CATEGORYS:
      return {
        ...state,
        loading: true,
      };
    case ProductCategory.GET_ALL_PRODUCT_CATEGORYS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        productCategories: action.payload.data,
      };
    case ProductCategory.GET_ALL_PRODUCT_CATEGORYS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ProductCategory.DELETE_PRODUCT_CATEGORY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case ProductCategory.DELETE_PRODUCT_CATEGORY_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ProductCategory.DELETE_PRODUCT_CATEGORY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ProductCategory.UPDATE_PRODUCT_CATEGORY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case ProductCategory.UPDATE_PRODUCT_CATEGORY_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ProductCategory.UPDATE_PRODUCT_CATEGORY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ProductCategory.SET_PRODUCT_CATEGORY_OBJ:
      return {
        ...state,
        loading: true,
      };
    case ProductCategory.SET_PRODUCT_CATEGORY_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        productCategoryObj: action.payload.data,
        loading: false,
        error: null,
      };
    case ProductCategory.SET_PRODUCT_CATEGORY_OBJ_FAIL:
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
