import {RootState} from "../store";

export const selectUsersList = (state: RootState) => state.users?.users_list;
export const selectUsersTotal = (state: RootState) => state.users?.count;
export const selectUsersPage = (state: RootState) => state.users?.page;
export const selectUsersPerPage = (state: RootState) => state.users?.per_page;


