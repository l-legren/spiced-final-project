import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { OutlinedInput, Grid, Container } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";
import NavBar from "./navbar";
import Profile from "./profile";
import { getUserInfo } from "./actions";
import { useDispatch } from "react-redux";

const App = () => {
    const dispatch = useDispatch();

    // const [first, setFirst] = useState("");
    // const [last, setLast] = useState("");
    // const [id, setId] = useState("");
    // const [email, setEmail] = useState("");
    // const [profilePic, setProfilePic] = useState("");
    // const [bio, setBio] = useState("");

    const theme = createMuiTheme();

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <NavBar />
            </ThemeProvider>
            <Profile />
        </>
    );
};

export default App;
