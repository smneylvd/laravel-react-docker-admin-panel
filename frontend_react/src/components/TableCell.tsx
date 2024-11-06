import {styled, TableCell as MuiTableCell, tableCellClasses} from "@mui/material";

export const TableCell = styled(MuiTableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "rgba(0,0,0,0.13)",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: "whitesmoke",
    },
}));
