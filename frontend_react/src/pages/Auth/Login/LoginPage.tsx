import React from 'react';
import '../../../App.css';
import {Button, Card, CardContent, Input, Link, Typography} from "@mui/material";
import routes from "../../../utils/Routes";
import {isAuthenticated} from "../../../utils/userAuth";
import {fetchLoginRequest} from "../../../store/auth/actionCreators";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {IAuthLogin} from "../types";

function LoginPage() {

    const [state, setState] = React.useState<IAuthLogin>({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
        setState({...state, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        dispatch(fetchLoginRequest(state));

        // Check authentication status after a delay to ensure the request has completed
        setTimeout(() => {
            const urlElements = window.location.href.split('/');
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
                        Login
                    </Typography>
                    <form style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem'}}>
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
                            Login
                        </Button>
                    </form>
                    <Typography fontSize=".8rem" textAlign="center" mt="1rem">
                        Dont have an account? {' '}
                        <Link sx={{textDecoration: 'none', fontWeight: '600'}} href={routes.register}>
                            Register
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

export default LoginPage;
