import React from 'react';
import logo from '../../assets/images/logo.svg';
import '../../App.css';
import {Box, Button, Card, CardContent, Input, Link, Typography} from "@mui/material";
import routes from "../../utils/Routes";
import {IAuthPageBase} from "./types";

export const AuthBaseLayout: React.FC<IAuthPageBase> = (props) => {
    const {children} = props;
    return (
        <React.Fragment>
            <Box display="flex" justifyContent="center" width="100%">
                <Box display="flex" flexDirection="column" justifyContent="center">
                    <img src={logo} className="App-logo" alt="logo"/>
                </Box>
                {children}
            </Box>
        </React.Fragment>
    );
}
