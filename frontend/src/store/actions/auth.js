import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    LOGOUT,
} from "./types";
import setAlert from "./alert";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/token/`,
            body,
            config
        );
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
            userInfo: email,
        });
        dispatch(setAlert("Authenticated Successfully", "success"));
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
        });
        dispatch(setAlert("Error Authenticating", "danger"));
    }
};

export const signup =
    (name, email, password, password2) => async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ name, email, password, password2 });
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/accounts/signup`,
                body,
                config
            );
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data,
                userInfo: email,
            });
            dispatch(setAlert("Signup Successful", "success"));
            dispatch(login(email, password));
        } catch (err) {
            dispatch({
                type: SIGNUP_FAIL,
            });
            dispatch(setAlert("Error Signing up", "danger"));
        }
    };

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT });
    dispatch(setAlert("Logout Successful", "success"));
};
