import * as actionType from '../actions/actionType'
import { updateObject } from '../utility'

const initialStaet = {
    token: null,
    erroe: null,
    loding: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loding: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loding: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.erroe,
        loding: false
    })
}

const authLogOut = (state, action) => {
    return updateObject(state, {
        token: null
    })
}

const reducer = (state = initialStaet, action) => {
    switch (action.type) {
        case actionType.AUTH_START: return authStart(state, action);
        case actionType.AUTH_SUCCESS: return authSuccess(state, action);
        case actionType.AUTH_FAIL: return authFail(state, action);
        case actionType.AUTH_LOGOUT: return authLogOut(state, action);
        default:
            return state;
    }
}

export default reducer;