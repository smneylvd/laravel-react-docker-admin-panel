import React from 'react';
import {AuthBaseLayout} from "../AuthBaseLayout";
import LoginPage from "./LoginPage";


const LoginPageContainer: React.FC = () => {

    return (
        <React.Fragment>
            <AuthBaseLayout>
                <LoginPage/>
            </AuthBaseLayout>
        </React.Fragment>
    );
};

export default LoginPageContainer;