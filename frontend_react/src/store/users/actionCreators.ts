import {
    FETCH_CANCEL_FILTER_SAGA, FETCH_CATEGORIES_SAGA,
    FETCH_USERS_SAGA,
    FETCH_USERS_SEARCH_SAGA, FETCH_SOURCES_SAGA
} from "./types/types";

export const fetchUsers = () => ({type: FETCH_USERS_SAGA});
export const cancelFilters = () => ({type: FETCH_CANCEL_FILTER_SAGA});
export const fetchUsersSearch = (payload: any) => ({type: FETCH_USERS_SEARCH_SAGA, payload});
