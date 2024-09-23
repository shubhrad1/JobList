import {
    Autocomplete,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);

    const uniqueCompany = [...new Set(jobs.map((job) => job.company))];
    const uniquePosition = [...new Set(jobs.map((job) => job.position))];
    const uniqueLocation = [...new Set(jobs.map((job) => job.location))];

    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [location, setLocation] = useState("");

    const [filteredJobs, setFilteredJobs] = useState([]);

    const JobCard = ({ job }) => {
        return (
            <Card
                sx={{
                    margin: "20px",
                    width: "300px",
                    textAlign: "center",
                }}
                key={job.id}
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
                    >
                        <Button variant="contained" color="primary">
                            Apply
                        </Button>
                        <Button variant="contained" color="secondary">
                            Learn More
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        );
    };
    const handleSearch = () => {
        if (company === "" && position === "" && location === "") {
            setFilteredJobs(jobs);
        } else {
            let filtered = jobs.filter(
                (job) =>
                    job.company.includes(company) &&
                    job.position.includes(position) &&
                    job.location.includes(location)
            );
            setFilteredJobs(filtered);
        }
    };
    useEffect(() => {
        const getJobs = async () => {
            try {
                const response = await axios.get("/api/v1/getJobs");
                setJobs(response.data);
            } catch (error) {
                console.log("Error", error);
            }
        };
        getJobs();
    }, []);
    useEffect(() => {
        setFilteredJobs(jobs);
    }, [jobs]);

    return (
        <div
            style={{
                padding: "20px",
            }}
        >
            <Typography variant="h2">Jobs</Typography>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    margin: "20px",
                }}
            >
                <Autocomplete
                    options={uniqueCompany}
                    sx={{ width: "300px" }}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField {...params} label="Search Company" />
                    )}
                    ListboxProps={{
                        style: { maxHeight: 200, overflow: "auto" },
                    }}
                    onChange={(event, value) =>
                        value ? setCompany(value) : setCompany("")
                    }
                />
                <Autocomplete
                    options={uniquePosition}
                    sx={{ width: "300px" }}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField {...params} label="Search Position" />
                    )}
                    ListboxProps={{
                        style: { maxHeight: 200, overflow: "auto" },
                    }}
                    onChange={(event, value) =>
                        value ? setPosition(value) : setPosition("")
                    }
                />
                <Autocomplete
                    options={uniqueLocation}
                    sx={{ width: "300px" }}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField {...params} label="Search Location" />
                    )}
                    ListboxProps={{
                        style: { maxHeight: 200, overflow: "auto" },
                    }}
                    defaultValue=""
                    onChange={(event, value) =>
                        value ? setLocation(value) : setLocation("")
                    }
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                >
                    Search
                </Button>
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
                {filteredJobs.map((job) => (
                    <JobCard job={job} key={job.id} />
                ))}
            </div>
        </div>
    );
};
export default Jobs;
