import React from 'react';
import {AuthBaseLayout} from "../AuthBaseLayout";
import {RegisterPage} from "./RegisterPage";


const RegisterPageContainer: React.FC = () => {

    return (
        <React.Fragment>
            <AuthBaseLayout>
                <RegisterPage/>
            </AuthBaseLayout>
        </React.Fragment>
    );
};

export default RegisterPageContainer;