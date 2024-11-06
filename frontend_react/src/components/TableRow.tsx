import {styled, TableRow as MuiTableRow, tableRowClasses} from "@mui/material";

export const TableRow = styled(MuiTableRow)(({theme}) => ({

    [`&.${tableRowClasses.head}:hover`]: {
        cursor: "auto",
    },
    '&:nth-of-type(odd)': {
        backgroundColor: "#343c45",
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#4b5262",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&:hover': {
        backgroundColor: "#31343a",
        cursor: "pointer"
    },
}));
