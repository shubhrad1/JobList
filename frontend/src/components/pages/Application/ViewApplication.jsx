import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Cookies } from "react-cookie";
import {
    Chip,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
} from "@mui/material";

const ViewApplication = () => {
    const [applications, setApplications] = React.useState([]);
    const [jobIdSet, setJobIdSet] = React.useState(new Set());
    const [jobs, setJobs] = React.useState([]);

    const cookies = new Cookies();
    const token = cookies.get("token");

    const getStatusChip = (status) => {
        let color;
        switch (status) {
            case "Pending":
                color = "warning";
                break;
            case "Rejected":
                color = "error";
                break;
            case "Accepted":
                color = "success";
                break;
            default:
                color = "default";
        }
        return <Chip label={status} color={color} />;
    };

    // const cleanedDataJob = jobs.map((job) => job[0]);
    // console.log(cleanedDataJob);

    const entry = applications.map((application) => {
        const job = jobs.find((job) => job._id === application.jobId);
        if (!job) return null;
        const formatDate = (dateString) => {
            const options = {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            };
            return new Date(dateString).toLocaleDateString("en-GB", options);
        };

        return (
            <TableRow key={application._id}>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.position}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>
                    {job.currency} {job.salary}
                </TableCell>
                <TableCell>{formatDate(application.createdAt)}</TableCell>
                <TableCell>{getStatusChip(application.status)}</TableCell>
            </TableRow>
        );
    });

    useEffect(() => {
        const getApplications = async () => {
            const URL = "/api/v1/user/getApplication";
            try {
                const response = await axios.get(URL, {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });
                const applicationsData = response.data;
                setApplications(applicationsData);

                const jobIds = applicationsData.map((app) => app.jobId);
                setJobIdSet(new Set(jobIds));
            } catch (error) {
                console.log("Error", error);
            }
        };
        getApplications();
    }, [token]);

    useEffect(() => {
        const getJobs = async () => {
            const jobIdArray = Array.from(jobIdSet);
            console.log(jobIdArray);
            const response = await axios.get("/api/v1/getJobsByIds", {
                params: {
                    jobId: JSON.stringify(jobIdArray),
                },
            });
            setJobs(response.data);
        };
        getJobs();
    }, [jobIdSet]);
    console.log(jobs);

    return (
        <Box display="flex" justifyContent="center" width="100%">
            <Box width="95%">
                <Typography
                    variant="h2"
                    color="initial"
                    sx={{
                        marginBottom: "40px",
                    }}
                >
                    MyApplications
                </Typography>
                <TableContainer component="paper">
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    backgroundColor: "#f5f5f5",
                                }}
                            >
                                <TableCell>Company</TableCell>
                                <TableCell>Job Title</TableCell>

                                <TableCell>Location</TableCell>
                                <TableCell>Salary</TableCell>
                                <TableCell>Application Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{entry}</TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default ViewApplication;
