import { Autocomplete, Card, Typography } from "@mui/material";
import React from "react";

const Home = () => {
    return (
        <div style={{ margin: "40px" }}>
            <Typography variant="h1">Welcome to JobList</Typography>
            <Typography variant="h4">Search your perfect job today!</Typography>
            <Autocomplete>Search Role:</Autocomplete>
            <Autocomplete>Search Location:</Autocomplete>
        </div>
    );
};
export default Home;
