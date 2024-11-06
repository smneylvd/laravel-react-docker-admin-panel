import {call, put, takeLatest} from "redux-saga/effects";
import {
    FETCH_AUTH_LOGIN_ERROR,
    FETCH_AUTH_LOGIN_SAGA,
    FETCH_AUTH_LOGIN_SUCCESS,
    FETCH_AUTH_LOGOUT,
    FETCH_AUTH_LOGOUT_SAGA,
    FETCH_AUTH_REGISTER_ERROR,
    FETCH_AUTH_REGISTER_SAGA,
    FETCH_AUTH_REGISTER_SUCCESS,
} from "./types/actionTypes";
import {setGlobalLoader, setSnackbar} from "../generals/actionCreators";
import {authApi} from "../../service/api";
import {getRequestError} from "../../utils/getRequestError";
import {LoadingStatus} from "../generals/types";

export function* fetchAuthLogout() {
    yield put({type: FETCH_AUTH_LOGOUT});
    yield put(setSnackbar({visible: true, message: "Logout", status: "success"}));
}

export function* fetchAuthLogin(action: any) {
    try {
        yield put(setGlobalLoader(LoadingStatus.LOADING))

        const {data} = yield call(authApi.login, action.payload);

        yield put({type: FETCH_AUTH_LOGIN_SUCCESS, payload: data});
        yield put(setSnackbar({visible: true, message: data.message, status: "success"}));
        yield put(setGlobalLoader(LoadingStatus.SUCCESS))


    } catch (e) {
        yield put(setGlobalLoader(LoadingStatus.ERROR))

        yield put({type: FETCH_AUTH_LOGIN_ERROR});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchAuthRegister(action: any) {
    try {
        yield put(setGlobalLoader(LoadingStatus.LOADING))
        const {data} = yield call(authApi.register, action.payload);
        if (data.message && data.message.includes("Success")) {
            yield put({type: FETCH_AUTH_REGISTER_SUCCESS, payload: data});
        }
        yield put(setSnackbar({visible: true, message: data.message, status: "success"}));
        yield put(setGlobalLoader(LoadingStatus.SUCCESS))

    } catch (e: any) {
        yield put(setGlobalLoader(LoadingStatus.ERROR))

        yield put({type: FETCH_AUTH_REGISTER_ERROR});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}


export function* authSagas() {
    yield takeLatest(FETCH_AUTH_LOGIN_SAGA, fetchAuthLogin);
    yield takeLatest(FETCH_AUTH_REGISTER_SAGA, fetchAuthRegister);
    yield takeLatest(FETCH_AUTH_LOGOUT_SAGA, fetchAuthLogout);
}