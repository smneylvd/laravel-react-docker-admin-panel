import React from 'react';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,

} from "@mui/material";
import {TableCell} from './TableCell';
import {TableRow} from './TableRow';
import {IHistoryRecord} from "./HistoryRecordsTable.props";

export const HistoryRecordsTable: React.FC<IHistoryRecord> = (props) => {
    const items = props.items;
    if (!items) {
        return null;
    }
    const handleCopy = () => {

    }
    return (
        <TableContainer>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell>UUID</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell></TableCell>
                        <TableCell>Creation Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((row: any) => (
                        <TableRow
                            key={row.uuid}
                            onClick={handleCopy}
                        >
                            <TableCell component="th" scope="row">
                                {row.uuid.substr(0, 7) + "..."}
                            </TableCell>
                            <TableCell>{row.action}</TableCell>
                            <TableCell
                                sx={{whiteSpace: "pre"}}>{(row.prev_val || row.curr_val) && `Column: ${row.column}\nfrom: ${row.prev_val}\nto: ${row.curr_val}`}</TableCell>
                            <TableCell>{row.created_at}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>)

}