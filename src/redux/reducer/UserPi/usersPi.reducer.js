import { toastError, toastSuccess } from '../../../utils/toastUtils'
import * as userPi from '../../actions/UserPi/userPi.actions'

const initialState = {
    userPi: null,
    userPiObj: {},
    error: null,
    loading: null,
}

export const userPiReducer = (state = initialState, action) => {
    switch (action.type) {
        case userPi.USER_PI_ADD:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case userPi.USER_PI_ADD_SUCCESS:
            toastSuccess(action.payload.message)
            return {
                ...state,
                loading: false,
                error: null,
            }
        case userPi.USER_PI_ADD_FAIL:
            toastError(action.payload)
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case userPi.USER_PI_GET:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case userPi.USER_PI_GET_SUCCESS:
            // toastSuccess(action.payload.message)
            return {
                ...state,
                userPi: action.payload.users,
                loading: false,
                error: null,
            }
        case userPi.USER_PI_GET_FAIL:
            toastError(action.payload)
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case userPi.USER_PI_DELETE:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case userPi.USER_PI_DELETE_SUCCESS:
            toastSuccess(action.payload.message)
            return {
                ...state,
                loading: false,
                error: null,
            }
        case userPi.USER_PI_DELETE_FAIL:
            toastError(action.payload)
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case userPi.SET_USER_PI_OBJ:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case userPi.SET_USER_PI_OBJ_SUCCESS:
            // toastSuccess(action.payload.message)
            return {
                ...state,
                userPiObj: action.payload.data,
                loading: false,
                error: null,
            }
        case userPi.SET_USER_PI_OBJ_FAIL:
            toastError(action.payload)
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case userPi.USER_PI_UPDATE:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case userPi.USER_PI_UPDATE_SUCCESS:
            toastSuccess(action.payload.message)
            return {
                ...state,
                loading: false,
                error: null,
            }
        case userPi.USER_PI_UPDATE_FAIL:
            toastError(action.payload)
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}
