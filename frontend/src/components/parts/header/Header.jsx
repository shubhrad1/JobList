import React, { useEffect } from "react";
import {
    AppBar,
    Button,
    ButtonGroup,
    Tabs,
    Tab,
    Toolbar,
    Typography,
} from "@mui/material";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const cookies = new Cookies();
    const token = cookies.get("token")
        ? cookies.get("token")
        : sessionStorage.getItem("token");
    const [user, setUser] = React.useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            if (token) {
                const header = "token " + token;
                try {
                    const response = await axios.get("/api/v1/getUser", {
                        headers: {
                            Authorization: header,
                        },
                    });
                    setUser(response.data);
                } catch (error) {
                    console.log("Error", error);
                }
            }
        };
        getUser();
    }, [token]);

    const handleSignOut = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("name");
        cookies.remove("token");
        setUser(null);
    };
    const handleSignIn = () => {
        navigate("/login");
    };
    const handleSignUp = () => {
        navigate("/signup");
    };

    const userButtons = () => {
        if (!user) {
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Tabs textColor="inherit">
                        <Tab label="Home" />
                        <Tab label="Find Jobs" />
                        <Tab label="Recruiter" />
                        <Tab label="About Us" />
                    </Tabs>
                    <Button
                        variant="contained"
                        textColor="inherit"
                        disableElevation
                        onClick={handleSignIn}
                    >
                        SignIn
                    </Button>
                    <Button
                        variant="contained"
                        textColor="inherit"
                        disableElevation
                        onClick={handleSignUp}
                    >
                        Register
                    </Button>
                </div>
            );
        } else {
            console.log(user);
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Tabs textColor="inherit">
                        <Tab label="Find Jobs" />
                        <Tab label="News" />
                        <Tab label="About Us" />
                    </Tabs>
                    <Button
                        variant="contained"
                        textColor="inherit"
                        disableElevation
                    >
                        Welcome, {user.name}
                    </Button>
                    <Button
                        variant="contained"
                        textColor="inherit"
                        disableElevation
                        onClick={handleSignOut}
                    >
                        SignOut
                    </Button>
                </div>
            );
        }
    };

    return (
        <div>
            <AppBar position="sticky" sx={{ background: "#3e3e3e" }}>
                <Toolbar>
                    <Typography variant="h4">JobList</Typography>
                    <ButtonGroup sx={{ marginLeft: "auto" }} color="#3e3e3e">
                        {/* <Tabs textColor="inherit">
                            <Tab label="Home" />
                            <Tab label="Find Jobs" />
                            <Tab label="Recruiter" />
                            <Tab label="About Us" />
                        </Tabs> */}

                        {/* <Button variant="contained" disableElevation>
                        Apply
                    </Button>
                    <Button variant="contained" disableElevation>
                        Recruiter
                    </Button> */}

                        {userButtons()}
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
        </div>
    );
};
export default Header;
