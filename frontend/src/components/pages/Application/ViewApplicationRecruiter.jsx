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

const ViewApplicationR = () => {
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

    const entry = jobs.map((job) => {
        const application = applications.find(
            (application) => application._id === job.jobId
        );
        if (!application) return null;
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
                <TableCell>{application._id}</TableCell>
                <TableCell>{application.company}</TableCell>
                <TableCell>{application.position}</TableCell>
                <TableCell>{application.location}</TableCell>
                <TableCell>{job.resume}</TableCell>
                <TableCell>{job.userId}</TableCell>
                <TableCell>{formatDate(job.createdAt)}</TableCell>
                <TableCell>{getStatusChip(job.status)}</TableCell>
            </TableRow>
        );
    });

    useEffect(() => {
        const getApplications = async () => {
            const URL = "/api/v1/getJob";
            try {
                const response = await axios.get(URL, {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });
                const applicationsData = response.data;
                setApplications(applicationsData);

                const jobIds = applicationsData.map((app) => app._id);
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

            const response = await axios.get("/api/v1/job/getApplication", {
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
                    Applications
                </Typography>
                <TableContainer component="paper">
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    backgroundColor: "#f5f5f5",
                                }}
                            >
                                <TableCell>JobID</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Job Title</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Resume URL</TableCell>
                                <TableCell>UserID</TableCell>
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

export default ViewApplicationR;
