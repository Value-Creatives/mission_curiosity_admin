import { AddUserPiData, deleteUserPiData, getUserPi, updateUserPiData } from '../../../services/userPi.service'

export const USER_PI_GET = 'USER_PI_GET'
export const USER_PI_GET_SUCCESS = 'USER_PI_GET_SUCCESS'
export const USER_PI_GET_FAIL = 'USER_PI_GET_FAIL'

export const USER_PI_ADD = 'USER_PI_ADD'
export const USER_PI_ADD_SUCCESS = 'USER_PI_ADD_SUCCESS'
export const USER_PI_ADD_FAIL = 'USER_PI_ADD_FAIL'

export const USER_PI_UPDATE = 'USER_PI_UPDATE'
export const USER_PI_UPDATE_SUCCESS = 'USER_PI_UPDATE_SUCCESS'
export const USER_PI_UPDATE_FAIL = 'USER_PI_UPDATE_FAIL'

export const SET_USER_PI_OBJ = 'SET_USER_PI_OBJ'
export const SET_USER_PI_OBJ_SUCCESS = 'SET_USER_PI_OBJ_SUCCESS'
export const SET_USER_PI_OBJ_FAIL = 'SET_USER_PI_OBJ_FAIL'

export const USER_PI_DELETE = 'USER_PI_DELETE'
export const USER_PI_DELETE_SUCCESS = 'USER_PI_DELETE_SUCCESS'
export const USER_PI_DELETE_FAIL = 'USER_PI_DELETE_FAIL'

export const userPiAdd = (formData) => async (dispatch) => {
    try {
        dispatch({ type: USER_PI_ADD })
        let { data: response } = await AddUserPiData(formData)
        if (response) {
            dispatch({
                type: USER_PI_ADD_SUCCESS,
                payload: { users: [], message: response.message },
            })
            dispatch(usersPiGet())
        }
    } catch (error) {
        console.error(error)
        dispatch({ type: USER_PI_ADD_FAIL, payload: error })
    }
}


export const SetUserPIObj = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SET_USER_PI_OBJ });
        if (formData) {
            dispatch({
                type: SET_USER_PI_OBJ_SUCCESS,
                payload: { data: formData },
            });
        } else {
            dispatch({
                type: SET_USER_PI_OBJ_SUCCESS,
                payload: { data: null },
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: SET_USER_PI_OBJ_FAIL, payload: { message: "NOT FOUND" } });
    }
};



export const usersPiGet = (formData) => async (dispatch) => {
    try {
        dispatch({ type: USER_PI_GET })
        let query = undefined
        if (formData)
            query = formData
        let { data: response } = await getUserPi(formData)
        if (response) {
            dispatch({
                type: USER_PI_GET_SUCCESS,
                payload: { users: response.data, message: response.message },
            })
        }
    } catch (error) {
        console.error(error)
        dispatch({ type: USER_PI_GET_FAIL, payload: error })
    }
}

export const userPiDelete = (formData) => async (dispatch) => {
    try {
        dispatch({ type: USER_PI_DELETE })
        let { data: response } = await deleteUserPiData(formData)
        if (response) {
            dispatch({
                type: USER_PI_DELETE_SUCCESS,
                payload: { users: response.data, message: response.message },
            })
            dispatch(usersPiGet())
        }
    } catch (error) {
        console.error(error)
        dispatch({ type: USER_PI_DELETE_FAIL, payload: error })
    }
}

export const updateUserPi = (formData, id) => async (dispatch) => {
    try {
        dispatch({ type: USER_PI_UPDATE })
        let { data: response } = await updateUserPiData(formData, id)
        if (response) {
            dispatch({
                type: USER_PI_UPDATE_SUCCESS,
                payload: { users: response.data, message: response.message },
            })
            dispatch(usersPiGet())
            // dispatch(usersGet('role='))
        }
    } catch (error) {
        console.error(error)
    }
}
