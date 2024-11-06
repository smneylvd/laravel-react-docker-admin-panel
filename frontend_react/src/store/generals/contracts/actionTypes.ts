import {Action} from "redux";
import {LoadingStatus, ISnackbar} from "../types";


export enum GeneralsType {
    SET_GLOBAL_STATUS = 'generals/SET_GLOBAL_STATUS',
    SET_SNACKBAR_STATUS = 'generals/SET_SNACKBAR_STATUS',
}

export interface SetGlobalLoaderActionInterface extends Action<GeneralsType> {
    type: GeneralsType.SET_GLOBAL_STATUS;
    payload: LoadingStatus,

    [key: string]: any;
}

export interface SetSnackbarActionInterface extends Action<GeneralsType> {
    type: GeneralsType.SET_SNACKBAR_STATUS;
    payload: ISnackbar,

    [key: string]: any;
}
