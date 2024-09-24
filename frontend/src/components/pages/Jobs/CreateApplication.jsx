import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

const CreateApplication = ({ data }) => {
    const [resume, setResume] = React.useState("");

    const cookies = new Cookies();

    const handleResumeChange = (e) => {
        setResume(e.target.value);
    };
    const handleApplicationSubmit = (e) => {
        e.preventDefault();
        try {
            const token = cookies.get("token");
            const header = "token " + token;
            const payload = {
                token: token,
                jobId: data.id,
                resume: resume,
                status: "Pending",
            };

            axios
                .post("/api/v1/postApplication", payload, {
                    headers: {
                        Authorization: header,
                    },
                })
                .then((response) => {
                    alert("Application Submitted");
                })
                .catch((err) => {
                    alert("Error: Application Exists");
                });
        } catch (err) {
            console.log("Error", err);
        }
    };
    return (
        <div>
            <Box
                sx={{
                    bgcolor: "background.paper",
                    borderRadius: 5,
                    boxShadow: 24,
                    p: 4,
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "scroll",
                }}
            >
                <Typography
                    variant="h4"
                    color="initial"
                    sx={{
                        marginBottom: "10px",
                    }}
                >
                    Create Application
                </Typography>

                <Typography variant="h6" color="initial">
                    Company Profile:
                </Typography>
                <Typography variant="h8" color="initial">
                    Company: {data.company}
                </Typography>
                <Typography variant="h8" color="initial">
                    Position: {data.position}
                </Typography>
                <Typography variant="h8" color="initial">
                    Location: {data.location}
                </Typography>
                <Typography variant="h8" color="initial">
                    Salary: {data.currency} {data.salary}
                </Typography>
                <Typography variant="h8" color="initial">
                    Description: {data.description}
                </Typography>
                <form onSubmit={handleApplicationSubmit}>
                    <FormControl
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <TextField
                            id="resume-input"
                            label="Resume URL"
                            variant="outlined"
                            sx={{
                                marginTop: "10px",
                            }}
                            onChange={handleResumeChange}
                            fullWidth
                            required
                        />
                        <ButtonGroup
                            sx={{
                                marginTop: "10px",
                            }}
                            fullWidth
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{}}
                                type="submit"
                                fullWidth
                            >
                                Submit
                            </Button>
                        </ButtonGroup>
                    </FormControl>
                </form>
            </Box>
        </div>
    );
};
export default CreateApplication;
