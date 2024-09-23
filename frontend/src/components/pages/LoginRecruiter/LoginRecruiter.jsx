import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    TextField,
    InputAdornment,
    IconButton,
    Alert,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
const BASE_URL = "/api/v1";

const LoginRecruiter = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();
    const homeNavigate = useNavigate();
    const [cookies, setCookie] = useCookies(["token"]);

    //Handler functions
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
                .post(BASE_URL + "/recruiter/signIn", {
                    email: email,
                    password: password,
                })
                .then((response) => {
                    if (response.status === 200) {
                        const decoded = jwtDecode(response.data.token);
                        const role = JSON.stringify(decoded.recruiter);
                        sessionStorage.setItem("token", response.data.token);
                        sessionStorage.setItem("id", response.data.userId);
                        sessionStorage.setItem("name", response.data.name);
                        sessionStorage.setItem("email", response.data.email);
                        sessionStorage.setItem("role", role);
                        if (remember) {
                            setCookie("token", response.data.token, {
                                maxAge: 60 * 60 * 24 * 7,
                            });
                            cookies.token = response.data.token;
                        }
                        homeNavigate("/");
                    } else {
                        Alert("Error", response.data.message);
                    }
                });
        } catch (error) {
            Alert("Error", error);
        }
    };
    const handleRemember = () => {
        setRemember(!remember);
    };
    const handleNavigate = () => {
        navigate("/recruiterSignUp");
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
                    title="Recruiter Login"
                    sx={{
                        textAlign: "center",
                    }}
                />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth>
                            <TextField
                                id="email-input"
                                type="email"
                                label="Email"
                                margin="dense"
                                onChange={handleEmailChange}
                                value={email}
                                required
                            />
                            <TextField
                                id="password-input"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                margin="dense"
                                onChange={handlePasswordChange}
                                value={password}
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={remember}
                                        onClick={handleRemember}
                                    />
                                }
                                label="Remember Me"
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
                                    SignUp
                                </Button>
                            </ButtonGroup>
                        </FormControl>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginRecruiter;
