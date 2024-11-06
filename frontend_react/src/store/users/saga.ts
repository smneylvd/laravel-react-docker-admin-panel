import {usersApi} from "../../service/api";
import {getRequestError} from "../../utils/getRequestError";
import {all, call, put, takeLatest} from "redux-saga/effects";
import {setGlobalLoader, setSnackbar} from "../generals/actionCreators";
import {
    FETCH_USERS_ERROR,
    FETCH_USERS_SAGA,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_SEARCH_ERROR,
    FETCH_USERS_SEARCH_SAGA,
    FETCH_USERS_SEARCH_SUCCESS,
    FETCH_USER_DETAIL_SUCCESS, FETCH_USER_DETAIL_ERROR, FETCH_USER_DETAIL_SAGA,
} from "./types/types";
import {LoadingStatus} from "../generals/types";


export function* fetchUsersSearchRequest(action: any) {
    try {
        console.log("SAGA", action.payload)
        yield put(setGlobalLoader(LoadingStatus.LOADING))
        const {data} = yield call(usersApi.search, action.payload);

        yield put({type: FETCH_USERS_SEARCH_SUCCESS, data});
        yield put(setGlobalLoader(LoadingStatus.SUCCESS))

        if (data.length === 0) {
            yield put(setSnackbar({visible: true, message: "No results", status: "info"}));
            yield put({type: FETCH_USERS_SAGA});
        } else {
            yield put(setSnackbar({visible: true, message: "Success!", status: "success"}));
        }


    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put(setGlobalLoader(LoadingStatus.ERROR))

        yield put({type: FETCH_USERS_SEARCH_ERROR});
    }
}

export function* fetchUsersRequest(action: any) {
    try {
        yield put(setGlobalLoader(LoadingStatus.LOADING))

        const {data} = yield call(usersApi.getUsers);
        yield put({type: FETCH_USERS_SUCCESS, data});
        yield put(setGlobalLoader(LoadingStatus.SUCCESS))

    } catch (e) {
        yield put(setGlobalLoader(LoadingStatus.ERROR))

        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: FETCH_USERS_ERROR});
    }
}

export function* fetchUsersDetailRequest(action: any) {
    try {
        yield put(setGlobalLoader(LoadingStatus.LOADING))

        const {data} = yield call(usersApi.getUser, action.payload);
        yield put({type: FETCH_USER_DETAIL_SUCCESS, data});
        yield put(setGlobalLoader(LoadingStatus.SUCCESS))


    } catch (e) {
        yield put(setGlobalLoader(LoadingStatus.ERROR))

        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: FETCH_USER_DETAIL_ERROR});
    }
}


export function* usersSaga() {
    yield all([
        takeLatest(FETCH_USERS_SAGA, fetchUsersRequest),
        takeLatest(FETCH_USERS_SEARCH_SAGA, fetchUsersSearchRequest),
        takeLatest(FETCH_USER_DETAIL_SAGA, fetchUsersDetailRequest),
    ]);
}
