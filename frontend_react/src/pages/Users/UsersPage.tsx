import React, {useEffect} from 'react';
import '../../App.css';
import {
    Box,
    Button, Card, CardContent,
    Input, Typography,

} from "@mui/material";
import {CustomPagination} from '../../components/Pagination';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectUsersList, selectUsersPage, selectUsersPerPage, selectUsersTotal} from "../../store/users/selectors";
import {fetchUsersSearch} from '../../store/users/actionCreators';
import {UsersTable} from '../../components/UsersTable';
import {FilterSection} from "../../components/FilterSection";


function UsersPage() {
    const users = useSelector(selectUsersList)
    const users_count = useSelector(selectUsersTotal);
    const page = useSelector(selectUsersPage)
    const per_page = useSelector(selectUsersPerPage)

    const [filterAttributes, setFilterAttributes] = React.useState({
        uuid: "",
        first_name: "",
        last_name: "",
        email: "",
        page: 1,
        per_page: 10
    });

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
        setFilterAttributes({...filterAttributes, [e.target.name]: e.target.value});
        console.log(filterAttributes);
    };

    useEffect(() => {
        if (!users.length) {
            searchFunction({page: 1, per_page: 10});
        }
    }, []);

    const searchFunction = (data: any = {}) => {
        dispatch(fetchUsersSearch(data));
    }

    const triggerSearch = () => {
        searchFunction(filterAttributes);
    }
    const clearFilters = () => {
        setFilterAttributes({
            uuid: "",
            first_name: "",
            last_name: "",
            email: "",
            page: 1,
            per_page: 10
        })
        searchFunction({page: 1, per_page: 10});
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }


    return (
        <React.Fragment>
            <Box display="flex" gap={2}>
                <Box display="flex" flexDirection="column" gap={1}>
                    <Button variant="outlined" onClick={handleBack}>Back</Button>
                    <FilterSection
                        clearFilters={clearFilters}
                        filterAttributes={filterAttributes}
                        triggerSearch={triggerSearch}
                        handleChange={handleChange}
                    />
                </Box>
                <Box display="flex" flexDirection="column">
                    <UsersTable/>
                    <Box mt={1} display="flex" justifyContent="center">
                        <CustomPagination searchFunc={searchFunction} page={page} per_page={per_page}
                                          total_count={users_count}/>
                    </Box>
                </Box>
            </Box>

        </React.Fragment>
    );
}

export default UsersPage;
