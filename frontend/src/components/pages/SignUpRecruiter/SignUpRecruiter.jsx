import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    FormControl,
    TextField,
    InputAdornment,
    IconButton,
    ButtonGroup,
    Button,
    Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "/api/v1";

const SignUpRecruiter = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    //Handler functions

    const handleNameChange = (e) => {
        setUserName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios
                .post(BASE_URL + "/recruiter/signUp", {
                    name: userName,
                    email: email,
                    password: password,
                })
                .then((response) => {
                    if (response.status === 201) {
                        sessionStorage.setItem("token", response.data.token);
                        sessionStorage.setItem("id", response.data.userId);
                        sessionStorage.setItem("name", response.data.name);
                        sessionStorage.setItem("role", response.data.role);
                        navigate("/");
                    } else {
                        console.log("Error", response.data.message);
                    }
                })
                .catch((error) => {
                    console.log("Error", error);
                });
        } catch (error) {
            Alert("Error", error);
        }
    };
    const handleNavigate = () => {
        navigate("/recruiterSignIn");
    };

    return (
        <div>
            <Card
                sx={{
                    width: "50%",
                    margin: "auto",
                    marginTop: "10%",
                    padding: "20px",
                    backgroundColor: "#f0f0f0",
                }}
                variant="outlined"
            >
                <CardHeader
                    title="Recruiter SignUp"
                    sx={{
                        textAlign: "center",
                    }}
                />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth>
                            <TextField
                                id="name-input"
                                type="Text"
                                label="Name"
                                margin="dense"
                                value={userName}
                                onChange={handleNameChange}
                                required
                            />
                            <TextField
                                id="email-input"
                                type="email"
                                label="Email"
                                margin="dense"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            <TextField
                                id="password-input"
                                label="Password"
                                margin="dense"
                                value={password}
                                type={showPassword ? "text" : "password"}
                                onChange={handlePasswordChange}
                                required
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            <ButtonGroup
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "10px",
                                    height: "50px",
                                }}
                                fullWidth
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleNavigate}
                                >
                                    SignIn
                                </Button>
                            </ButtonGroup>
                        </FormControl>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUpRecruiter;
