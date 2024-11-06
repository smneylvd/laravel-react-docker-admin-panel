import {styled, Input as MuiInput, inputBaseClasses} from "@mui/material";

export const Input = styled(MuiInput)(({theme}) => ({
    [`& input.Mui-disabled`]: {
        color: "white",
        WebkitTextFillColor: "rgba(255,255,255,0.45)",
    },
    [`&`]: {
        fontSize: 14,
        color: "whitesmoke",
    },
}));
