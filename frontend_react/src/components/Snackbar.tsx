import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Snackbar as MuiSnackbar} from '@mui/material';
import {selectSnackbar} from '../store/generals/selectors';
import {setSnackbar} from '../store/generals/actionCreators';
import {SnackbarProps} from './Snackbar.props';


export const Snackbar: React.FC<SnackbarProps> = () => {

    const dispatch = useDispatch();
    const skbr = useSelector(selectSnackbar);

    const closeSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string): void => {
        if (reason === 'clickaway') {
            return;
        }
        // dispatch(setSnackbar({visible: false}));
    };


    return (
        <MuiSnackbar
            key={skbr.message}
            open={skbr.visible}
            autoHideDuration={3000}
            onClose={closeSnackbar}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>

            <Alert
                variant='filled'
                severity={skbr.status}
                // onClose={closeSnackbar}
            >
                {skbr.message}
            </Alert>

        </MuiSnackbar>
    );
};
