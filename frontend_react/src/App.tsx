import React from 'react';
import './App.css';
import {Box, CircularProgress} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import routes from "./utils/Routes";
import LoginPageContainer from "./pages/Auth/Login/LoginPageContainer";
import RegisterPageContainer from "./pages/Auth/Register/RegisterPageContainer";
import {Snackbar} from './components/Snackbar';
import UsersPage from './pages/Users/UsersPage';
import {useSelector} from "react-redux";
import {selectGlobalIsLoading} from "./store/generals/selectors";
import UserDetailPage from "./pages/Users/UserDetailPage";

function App() {
    const isGLoading = useSelector(selectGlobalIsLoading);
    return (
        <div className="App">
            <Box className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path={routes.main} element={<MainPage/>}/>
                        <Route path={routes.login} element={<LoginPageContainer/>}/>
                        <Route path={routes.register} element={<RegisterPageContainer/>}/>
                        <Route path={routes.users} element={<UsersPage/>}/>
                        <Route path={routes.userDetail} element={<UserDetailPage/>}/>
                        {<Route path='*' element={<Navigate to={routes.main}/>}/>}
                    </Routes>
                </BrowserRouter>
                {isGLoading &&
                    <Box position='fixed'
                         zIndex={10}
                         height="100%"
                         display="flex"
                         top={0} bottom={0}
                         left={0} right={0}
                         bgcolor='rgba(0, 0, 0, 0.39)'>
                        <CircularProgress sx={{marginY: 'auto', marginX: 'auto'}} size="3rem"/>
                    </Box>}
            </Box>
            <Snackbar/>
        </div>
    );
}

export default App;
