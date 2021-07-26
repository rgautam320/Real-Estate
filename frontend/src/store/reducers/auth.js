import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT,
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: false,
    user: null,
};

const auth = (state = initialState, action) => {
    const { type, payload, userInfo } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.access);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: payload.access,
                user: userInfo,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
                user: userInfo,
            };
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null,
            };
        default:
            return state;
    }
};

export default auth;
