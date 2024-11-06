import {
    FETCH_AUTH_LOGIN_ERROR,
    FETCH_AUTH_LOGIN_SAGA,
    FETCH_AUTH_LOGIN_SUCCESS,
    FETCH_AUTH_LOGOUT,
    FETCH_AUTH_REGISTER_ERROR,
    FETCH_AUTH_REGISTER_SAGA,
    FETCH_AUTH_REGISTER_SUCCESS,
} from "./types/actionTypes";

const initialState = {
    userRole: "Guest",
    otpSent: false,
    isLoading: false,
    redirectToLogin: false,
    forgotStep: 1, // [1 - send code, 2 - confirm code, 3 - change pass]
    registrationStep: 1, // [1 - send code, 2 - registered]
};
export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_AUTH_LOGOUT:
            localStorage.clear();
            return {
                ...state,
                userRole: ""
            };
        case FETCH_AUTH_LOGIN_SAGA:
            localStorage.clear();
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                isLoading: false,
                otpSent: false
            };
        case FETCH_AUTH_LOGIN_ERROR:
            return {
                ...state,
                payload: action.payload,
                isLoading: false
            };
        case FETCH_AUTH_REGISTER_SAGA:
            localStorage.clear();
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                registrationStep: 2,
                isLoading: true
            };
        case FETCH_AUTH_LOGIN_SUCCESS:
        case FETCH_AUTH_REGISTER_SUCCESS:
            console.log(action);
            localStorage.setItem("token", action.payload.content.token);
            return {
                ...state,
                payload: action.payload,
                isLoading: false
            };
        case FETCH_AUTH_REGISTER_ERROR:
            return {
                ...state,
                payload: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
};