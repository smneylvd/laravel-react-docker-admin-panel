import {all} from "@redux-saga/core/effects";
import {authSagas} from "./auth/saga";
import { usersSaga } from "./users/saga";

export default function* rootSaga() {
    yield all([
        authSagas(),
        usersSaga(),
    ]);
};
