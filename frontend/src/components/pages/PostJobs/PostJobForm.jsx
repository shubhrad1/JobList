import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    FormControl,
    TextField,
    ButtonGroup,
    Button,
} from "@mui/material";
import axios from "axios";
const PostJobView = () => {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [salary, setSalary] = useState("");
    const [currency, setCurrency] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            company: company,
            position: position,
            location: location,
            currency: currency,
            salary: String(salary),
            description: description,
            recruiterId: sessionStorage.getItem("id"),
        };
        const URL = "/api/v1/postJob";
        try {
            console.log(data);
            const response = axios.post(URL, data, {
                headers: {
                    Authorization: "token " + sessionStorage.getItem("token"),
                },
            });
            if (response.status === 201) {
                alert("Job Posted Successfully");
                setCompany("");
                setPosition("");
                setLocation("");
                setDescription("");
                setSalary("");
                setCurrency("");
            }
        } catch (err) {
            console.log(err);
            alert("Job Posting Failed");
        }
    };
    const handleformChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        switch (id) {
            case "company-input":
                setCompany(value);
                break;
            case "position-input":
                setPosition(value);
                break;
            case "location-input":
                setLocation(value);
                break;
            case "description-input":
                setDescription(value);
                break;
            case "salary-input":
                setSalary(value);
                break;
            case "currency-input":
                setCurrency(value);
                break;
            default:
                break;
        }
    };
    return (
        <div>
            <Card
                sx={{
                    width: "50%",
                    margin: "auto",

                    padding: "20px",
                    backgroundColor: "#f0f0f0",
                }}
            >
                <CardHeader title="Post a Job" />
                <CardContent>
                    <form onSubmit={handleFormSubmit}>
                        <FormControl fullWidth>
                            <TextField
                                id="company-input"
                                label="Company"
                                variant="outlined"
                                margin="normal"
                                style={{ margin: "10px" }}
                                onChange={handleformChange}
                                value={company}
                                required
                            />
                            <TextField
                                id="position-input"
                                label="Position"
                                variant="outlined"
                                margin="normal"
                                style={{ margin: "10px" }}
                                onChange={handleformChange}
                                value={position}
                                required
                            />
                            <TextField
                                id="location-input"
                                label="Location"
                                variant="outlined"
                                margin="normal"
                                style={{ margin: "10px" }}
                                onChange={handleformChange}
                                value={location}
                                required
                            />
                            <TextField
                                id="description-input"
                                label="Description"
                                variant="outlined"
                                margin="normal"
                                style={{ margin: "10px" }}
                                onChange={handleformChange}
                                value={description}
                                required
                            />
                            <TextField
                                id="currency-input"
                                label="Currency"
                                variant="outlined"
                                margin="normal"
                                onChange={handleformChange}
                                value={currency}
                                style={{ margin: "10px" }}
                                required
                            />
                            <TextField
                                id="salary-input"
                                label="Salary"
                                variant="outlined"
                                margin="normal"
                                onChange={handleformChange}
                                value={salary}
                                style={{ margin: "10px" }}
                                required
                            />

                            <ButtonGroup
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        marginTop: "20px",
                                        width: "100%",
                                    }}
                                    type="submit"
                                >
                                    Post
                                </Button>
                            </ButtonGroup>
                        </FormControl>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default PostJobView;
