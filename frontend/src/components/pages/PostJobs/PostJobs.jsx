import { Button, Typography } from "@mui/material";
import React from "react";
import PostJobForm from "./PostJobForm";
import ListJobs from "./ListJobs";

const PostJobs = () => {
    const [view, setView] = React.useState();
    const handlePostJob = () => {
        setView(<PostJobForm />);
    };
    const handleShowJobs = () => {
        setView(<ListJobs />);
    };
    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h2">PostJobs</Typography>

            <Button
                variant="contained"
                color="primary"
                style={{ margin: "20px" }}
                onClick={handlePostJob}
            >
                Post Job
            </Button>
            <Button
                variant="contained"
                color="primary"
                style={{ margin: "20px" }}
                onClick={handleShowJobs}
            >
                Show Jobs
            </Button>
            {view}
        </div>
    );
};

export default PostJobs;
