import {
  FETCH_AUTH_LOGIN_SAGA, FETCH_AUTH_LOGOUT,
  FETCH_AUTH_LOGOUT_SAGA,
  FETCH_AUTH_REGISTER_SAGA,
} from "./types/actionTypes";

export const fetchLoginRequest = (payload: any) => ({
  type: FETCH_AUTH_LOGIN_SAGA,
  payload
});

export const fetchRegisterRequest = (payload: any) => ({
  type: FETCH_AUTH_REGISTER_SAGA,
  payload
});

export const fetchLogoutRequest = () => ({
  type: FETCH_AUTH_LOGOUT_SAGA,
});
