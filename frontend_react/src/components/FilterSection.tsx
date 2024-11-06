import React from 'react';
import {Button, Input, Box, Card, Typography, CardContent} from "@mui/material";
import {IFilter} from "./FilterSection.props";

export const FilterSection: React.FC<IFilter> = (props) => {

    const filterAttributes = props.filterAttributes;
    const handleChange = props.handleChange;
    const triggerSearch = props.triggerSearch;
    const clearFilters = props.clearFilters;

    return (
        <React.Fragment>
            <Card sx={{
                backgroundColor: "#ffffff0a",
                borderRadius: '.4rem',
                width: "100%",
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
                    <Typography fontSize="1.5rem" sx={{color: "whitesmoke"}} fontWeight="700">
                        Filter
                    </Typography>
                    <Box style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem'}}>
                        <Input
                            type="text"
                            name="uuid"
                            sx={{color: "whitesmoke"}}
                            value={filterAttributes.uuid}
                            onChange={handleChange}
                            placeholder="UUID"
                        />
                        <Input
                            type="text"
                            name="first_name"
                            value={filterAttributes.first_name}
                            sx={{color: "whitesmoke"}}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                        <Input
                            type="text"
                            name="last_name"
                            value={filterAttributes.last_name}
                            sx={{color: "whitesmoke"}}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
                        <Input
                            type="text"
                            name="email"
                            value={filterAttributes.email}
                            sx={{color: "whitesmoke"}}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <Button fullWidth={true} variant="outlined" color="success" onClick={triggerSearch}>
                            Search
                        </Button>
                        <Button fullWidth={true} variant="outlined" color="error" onClick={clearFilters}>
                            Clear
                        </Button>
                    </Box>
                </CardContent>
            </Card>


        </React.Fragment>
    );
};
