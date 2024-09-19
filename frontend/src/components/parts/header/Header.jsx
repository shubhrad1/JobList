import React from "react";
import {
    AppBar,
    Button,
    ButtonGroup,
    Tabs,
    Tab,
    Toolbar,
    Typography,
} from "@mui/material";

const Header = () => {
    return (
        <div>
            <AppBar position="stick" sx={{ background: "#3e3e3e" }}>
                <Toolbar>
                    <Typography variant="h4">JobList</Typography>
                    <ButtonGroup sx={{ marginLeft: "auto" }} color="#3e3e3e">
                        <Tabs textColor="#fff">
                            <Tab label="Home" />
                            <Tab label="Find Jobs" />
                            <Tab label="Recruiter" />
                            <Tab label="About Us" />
                        </Tabs>

                        {/* <Button variant="contained" disableElevation>
                        Apply
                    </Button>
                    <Button variant="contained" disableElevation>
                        Recruiter
                    </Button> */}

                        <Button variant="contained" disableElevation>
                            SignIn
                        </Button>
                        <Button variant="contained" disableElevation>
                            Register
                        </Button>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
        </div>
    );
};
export default Header;
