import React, {ReactNode, useEffect} from 'react';
import {
    Paper, Table,
    TableBody,
    TableContainer,
    TableHead,

} from "@mui/material";
import {TableCell} from './TableCell';
import {TableRow} from './TableRow';
import {useSelector} from "react-redux";
import {selectUsersList} from '../store/users/selectors';
import {useNavigate} from "react-router-dom";
import styles from './Styles.module.css';
export const UsersTable = () => {
    const users = useSelector(selectUsersList)
    const navigate = useNavigate();
    const handleUserDetail = (uuid: string) => {
        navigate(`/users/${uuid}`);
    }
    return (
        <TableContainer>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell>UUID</TableCell>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">email</TableCell>
                        <TableCell align="right">Registration Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row: any) => (
                        <TableRow
                            className={row.deleted_at ? styles.deleted : ''}
                            key={row.uuid}
                            onClick={() => {
                                handleUserDetail(row.uuid);
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.uuid}
                            </TableCell>
                            <TableCell align="right">{row.first_name}</TableCell>
                            <TableCell align="right">{row.last_name}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.created_at}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>)

}