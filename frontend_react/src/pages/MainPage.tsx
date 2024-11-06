import React from 'react';
import logo from '../assets/images/logo.svg';
import '../App.css';
import {Box, Button} from "@mui/material";
import {replace, useNavigate} from "react-router-dom";
import routes from "../utils/Routes";
import {isAuthenticated} from "../utils/userAuth";
import {useDispatch} from "react-redux";
import {fetchAuthLogout} from "../store/auth/saga";
import {fetchLogoutRequest} from "../store/auth/actionCreators";

function MainPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = () => {
        navigate(routes.login)
    }

    const handleRegister = () => {
        navigate(routes.register)
    }

    const handleUsers = () => {
        navigate(routes.users)
    }

    const handleLogout = () => {
        dispatch(fetchLogoutRequest());
        navigate('/')
    }

    return (
        <React.Fragment>
            <img src={logo} className="App-logo" alt="logo"/>
            {isAuthenticated() ? (
                <Box display="flex" width="20%" flexDirection="column" gap={1}>
                    <Button variant="outlined" color="secondary" size='large' onClick={handleUsers}
                            fullWidth={true}>Users</Button>
                    <Button variant="outlined" color="error" size='large' onClick={handleLogout} fullWidth={true}>Log
                        out</Button>
                </Box>
            ) : (
                <Box display="flex" width="20%" flexDirection="column" gap={1}>
                    <Button variant="outlined" onClick={handleLogin} fullWidth={true}>Login</Button>
                    <Button variant="outlined" onClick={handleRegister} fullWidth={true}>Register</Button>
                </Box>
            )}
        </React.Fragment>

    );
}

export default MainPage;
