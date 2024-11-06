import createSagaMiddleWare from 'redux-saga';
import {applyMiddleware, combineReducers, createStore} from 'redux';

import rootSaga from './sagas';
import {generalsReducer} from './generals/reducer';
import {authReducer} from './auth/reducer';
import usersReducer from './users/reducer';
import {configureStore} from "@reduxjs/toolkit";

const sagaMiddleWare = createSagaMiddleWare();

const reducers = combineReducers({
    generals: generalsReducer,
    auth: authReducer,
    users: usersReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleWare),
});

declare global {
    interface Window {
        store: any;
    }
}

window['store'] = store;

sagaMiddleWare.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

// const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleWare];