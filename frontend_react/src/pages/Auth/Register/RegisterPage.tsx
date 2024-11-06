import React from 'react';
import '../../../App.css';
import {Button, Card, CardContent, Input, Link, Typography} from "@mui/material";
import routes from "../../../utils/Routes";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {IAuthRegister} from '../types';
import {isAuthenticated} from '../../../utils/userAuth';
import {fetchRegisterRequest} from '../../../store/auth/actionCreators';

export const RegisterPage: React.FC = () => {
    const [state, setState] = React.useState<IAuthRegister>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
        setState({...state, [e.target.name]: e.target.value});
    };

    const navigate = useNavigate();

    const onSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        dispatch(fetchRegisterRequest(state));
        setTimeout(() => {
            const urlElements = window.location.href.split('/');
            console.log(urlElements)
            if (isAuthenticated() && urlElements.includes('auth')) {
                navigate(routes.main, {replace: true});
            }
        }, 2000);
    };

    return (
        <React.Fragment>
            <Card sx={{
                marginY: 'auto',
                borderRadius: '.8rem',
                padding: '.6rem',
                width: "25%",

                display: "flex"
            }}>
                <CardContent
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography fontSize="1.5rem" fontWeight="700">
                        Register
                    </Typography>
                    <form style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem'}}>
                        <Input
                            type="text"
                            name="first_name"
                            sx={{background: 'white'}}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                        <Input
                            type="text"
                            name="last_name"
                            sx={{background: 'white'}}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
                        <Input
                            type="text"
                            name="email"
                            sx={{background: 'white'}}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <Input
                            type="password"
                            name="password"
                            sx={{background: 'white'}}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        <Button fullWidth={true} variant="contained" onClick={onSubmit} type="submit">
                            Register
                        </Button>
                    </form>
                    <Typography fontSize=".8rem" textAlign="center" mt="1rem">
                        Already have an account? {' '}
                        <Link sx={{textDecoration: 'none', fontWeight: '600'}} href={routes.login}>
                            Login
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

