import React, { useEffect, useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Switch,
    Typography,
} from "@mui/material";
import axios from "axios";

const ListJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [url, setUrl] = useState("/api/v1/getJobs");
    const [view, setView] = useState(false);

    const JobCard = ({ job }) => {
        return (
            <Card
                sx={{
                    margin: "20px",
                    width: "300px",
                    textAlign: "center",
                }}
                key={job.id}
                color="primary"
            >
                <CardHeader title={job.company} />
                <CardContent
                    sx={{
                        textAlign: "left",
                        padding: "20px",
                    }}
                >
                    <Typography variant="body1">
                        Role: {job.position}
                    </Typography>
                    <Typography variant="body2">
                        Location: {job.location}
                    </Typography>
                    <Typography variant="body2">
                        Salary: {job.currency}&nbsp;
                        {job.salary}
                    </Typography>
                    <Typography variant="body2">
                        Description: {job.description}
                    </Typography>
                    <CardActions
                        sx={{
                            justifyContent: "center",
                            margin: "10px",
                        }}
                    ></CardActions>
                </CardContent>
            </Card>
        );
    };

    const handleViewChange = () => {
        if (view) {
            setView(false);
            setUrl("/api/v1/getJobs");
        } else {
            setView(true);
            setUrl("/api/v1/getJob");
        }
    };

    useEffect(() => {
        const getJobs = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `token ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                });
                setJobs(response.data);
            } catch (error) {
                console.log("Error", error);
            }
        };
        getJobs();
    }, [url]);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    padding: "20px",
                }}
            >
                <Typography>Show All</Typography>
                <Switch checked={view} onChange={handleViewChange} />
                <Typography>Only My Jobs</Typography>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px",

                    justifyContent: "center",
                }}
            >
                {jobs.map((job) => (
                    <JobCard job={job} />
                ))}
            </div>
        </div>
    );
};

export default ListJobs;
