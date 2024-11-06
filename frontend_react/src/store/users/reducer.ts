import {
    FETCH_CANCEL_FILTER_SAGA, FETCH_CATEGORIES_ERROR, FETCH_CATEGORIES_SAGA, FETCH_CATEGORIES_SUCCESS,
    FETCH_USERS_SAGA,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_SEARCH_SAGA,
    FETCH_USERS_SEARCH_SUCCESS, FETCH_SOURCES_ERROR, FETCH_SOURCES_SAGA, FETCH_SOURCES_SUCCESS
} from "./types/types";

interface UsersInterface {
    users_list: Array<any>,
    isFetching: boolean,
    first_name: string,
    last_name: string,
    per_page: number,
    page: number,
    count: number,
}

const initialState: UsersInterface = {
    users_list: [],
    isFetching: false,
    first_name: "",
    last_name: "",
    per_page: 10,
    page: 1,
    count: 0,
};

const usersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_USERS_SAGA:
            return {
                ...state,
                isFetching: true,
                iinValidated: false
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users_list: action.data.content.items,
                count: action.data.content.count,
                per_page: action.data.content.per_page,
                page: action.data.content.page,
                isFetching: false,
            };
        case FETCH_CANCEL_FILTER_SAGA:
            return {
                ...state,
                filtered_names: []
            };
        case FETCH_USERS_SEARCH_SAGA:
            return {
                ...state,
                per_page: action.payload.per_page,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                email: action.payload.email,
            };
        case FETCH_USERS_SEARCH_SUCCESS:
            console.log(action.data);
            return {
                ...state,
                users_list: action.data.content.items,
                count: action.data.content.count,
                per_page: action.data.content.per_page,
                page: action.data.content.page,
                isFetching: false,
            };
        case FETCH_CATEGORIES_SAGA:
            return {
                ...state,
                isFetching: true,
            };
        case FETCH_CATEGORIES_SUCCESS:
            console.log(action);
            return {
                ...state,
                isFetching: false,
            };
        case FETCH_CATEGORIES_ERROR:
            return {
                ...state,
                users_list: [],
                isFetching: false,
            };
        case FETCH_SOURCES_SAGA:
            return {
                ...state,
                isFetching: true,
            };
        case FETCH_SOURCES_SUCCESS:
            return {
                ...state,
                isFetching: false,
            };
        case FETCH_SOURCES_ERROR:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state; // Add this line to return the current state for unhandled actions
    }
};

export default usersReducer;
