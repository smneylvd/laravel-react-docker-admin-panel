import React from 'react';
import {Pagination, Paper, Stack, TablePagination} from '@mui/material';
import {PaginationProps} from "./Pagination.props";


export const CustomPagination: React.FC<PaginationProps> = (props) => {
    const initial_page = props.page ?? 1;
    const initial_per_page = props.per_page ?? 10;
    const total_count = props.total_count ?? 0;
    const data = props.data ?? {};
    const searchFunc = props.searchFunc ?? ((data: any) => {
    })

    const [page, setPage] = React.useState(initial_page);
    const [rowsPerPage, setRowsPerPage] = React.useState(initial_per_page);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage + 1);
        data['per_page'] = rowsPerPage;
        data['page'] = newPage + 1;
        console.log('CHANGE PAGE', data)
        searchFunc(data);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const newPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newPerPage);
        setPage(1)
        data['per_page'] = newPerPage;
        data['page'] = 1;
        console.log('CHANGE PER PAGE', data)
        searchFunc(data);
    };


    return (
        <TablePagination
            sx={{color: "white"}}
            component="div"
            count={total_count}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
};
