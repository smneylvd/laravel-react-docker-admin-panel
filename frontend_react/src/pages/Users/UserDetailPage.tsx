import React, {useEffect} from 'react';
import '../../App.css';
import {
    Box,
    Button,
    Typography,

} from "@mui/material";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {usersApi} from "../../service/api";
import {User} from './types';
import {Input} from '../../components/Input';
import {HistoryRecordsTable} from "../../components/HistoryRecordsTable";
import {setGlobalLoader, setSnackbar} from "../../store/generals/actionCreators";
import {LoadingStatus} from "../../store/generals/types";
import {getRequestError} from "../../utils/getRequestError";
import styles from '../../components/Styles.module.css';

function UserDetailPage() {
    const {uuid} = useParams();
    const [user, setUser] = React.useState<Partial<User> | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            dispatch(setGlobalLoader(LoadingStatus.LOADING));
            const response = await usersApi.getUser({uuid: uuid!});
            setUser(response.data.content);
            dispatch(setGlobalLoader(LoadingStatus.SUCCESS));

            dispatch(setSnackbar({visible: true, message: "Success!", status: "success"}));

        } catch (err) {
            dispatch(setGlobalLoader(LoadingStatus.ERROR))
            dispatch(setSnackbar({visible: true, message: getRequestError(err), status: "error"}));
            console.log(err);
        }
    };
    useEffect(function () {

        fetchUser();

    }, [!user])
    const handleUpdate = async () => {
        try {
            dispatch(setGlobalLoader(LoadingStatus.LOADING));
            const response = await usersApi.updateUser(user!)
            setUser(response.data.content)
            dispatch(setGlobalLoader(LoadingStatus.SUCCESS));

            dispatch(setSnackbar({visible: true, message: "Success!", status: "success"}));
        } catch (err) {
            dispatch(setGlobalLoader(LoadingStatus.ERROR));
            dispatch(setSnackbar({visible: true, message: getRequestError(err), status: "error"}));
            console.log(err);
        }
    }

    const handleDelete = async () => {
        try {
            dispatch(setGlobalLoader(LoadingStatus.LOADING));
            const response = await usersApi.deleteUser(user!)
            fetchUser();
            dispatch(setGlobalLoader(LoadingStatus.SUCCESS));

            dispatch(setSnackbar({visible: true, message: "Success!", status: "success"}));
        } catch (err) {
            dispatch(setGlobalLoader(LoadingStatus.ERROR))
            dispatch(setSnackbar({visible: true, message: getRequestError(err), status: "error"}));
            console.log(err);
        }
    }
    const handleRestore = async () => {
        try {
            dispatch(setGlobalLoader(LoadingStatus.LOADING));
            const response = await usersApi.restoreUser(user!)
            fetchUser();
            dispatch(setGlobalLoader(LoadingStatus.SUCCESS));

            dispatch(setSnackbar({visible: true, message: "Success!", status: "success"}));
        } catch (err) {
            dispatch(setGlobalLoader(LoadingStatus.ERROR));
            dispatch(setSnackbar({visible: true, message: getRequestError(err), status: "error"}));
            console.log(err);
        }
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
        setUser({...user, [e.target.name]: e.target.value});
        console.log(user);
    };

    const handleBack = () => {
        navigate(-1);
    }


    return (
        <React.Fragment>
            <Box display="flex" gap={4} width="100%" justifyContent="center">
                <Box display="flex" flexDirection="column" gap={1}>
                    <Button variant="outlined" onClick={handleBack}>Back</Button>
                    <Button variant="outlined" color="success" onClick={handleUpdate}>Save</Button>
                    {user?.deleted_at ?
                        (<Button variant="outlined" color="warning" onClick={handleRestore}>Restore</Button>) :
                        (<Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>)
                    }

                </Box>
                <Box
                    display="flex"
                    flexWrap="wrap"
                    p={2} sx={{borderRadius: "1rem"}}
                    className={user?.deleted_at ? styles.deleted : styles.user_info_bg}
                    width="30%" justifyContent="center">
                    <Box width="100%">
                        <Typography>User Information</Typography>
                    </Box>
                    <Box display="flex" width="35%" flexDirection="column" gap=".8rem" alignItems="start">
                        <Typography>UUID</Typography>
                        <Typography>First Name</Typography>
                        <Typography>Last Name</Typography>
                        <Typography>Email</Typography>
                        <Typography>Registration Date</Typography>
                        <Typography>Update Date</Typography>
                        <Typography>Delete Date</Typography>
                    </Box>
                    <Box display="flex" width="60%" flexDirection="column" gap={1}>
                        <Input
                            type="text"
                            fullWidth={true}
                            name="uuid"
                            disabled
                            value={user?.uuid}
                            onChange={handleChange}
                            placeholder="UUID"
                        />
                        <Input
                            type="text"
                            fullWidth={true}
                            name="first_name"
                            value={user?.first_name}
                            onChange={handleChange}
                            placeholder="First Name"
                        />

                        <Input
                            type="text"
                            fullWidth={true}
                            name="last_name"
                            value={user?.last_name}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
                        <Input
                            type="text"
                            fullWidth={true}
                            name="email"
                            value={user?.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <Input
                            type="text"
                            fullWidth={true}
                            name="created_at"
                            disabled
                            value={user?.created_at}
                            onChange={handleChange}
                            placeholder="created_at"
                        />
                        <Input
                            type="text"
                            fullWidth={true}
                            name="updated_at"
                            disabled
                            value={user?.updated_at}
                            onChange={handleChange}
                            placeholder="updated_at"
                        />
                        <Input
                            type="text"
                            fullWidth={true}
                            name="deleted_at"
                            disabled
                            value={user?.deleted_at}
                            onChange={handleChange}
                            placeholder="deleted_at"
                        />
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" gap={1}>
                    <Typography>User Update Records</Typography>
                    <Box sx={{overflowY: "auto", maxHeight: "50vh"}}>
                        <HistoryRecordsTable items={user?.history_records!}/>
                    </Box>
                </Box>
            </Box>

        </React.Fragment>
    );
}

export default UserDetailPage;
