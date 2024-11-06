import {AppBarProps} from "@mui/material";

export interface IAuthLogin {
    email: string,
    password: string,
}
export interface IAuthRegister {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}
export interface IAuthPageBase {
    children: any
}
