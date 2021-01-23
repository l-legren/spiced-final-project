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
import { useDispatch, useSelector } from "react-redux";
import OtherUser from "./other-user";

const App = () => {
    const dispatch = useDispatch();

    const theme = createMuiTheme();

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    return (
        <>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <NavBar />
                </ThemeProvider>

                <Route exact path="/" render={() => <Profile />} />
                <Route
                    path="/users/:id"
                    render={(props) => <OtherUser props={props} />}
                />
            </BrowserRouter>
        </>
    );
};

export default App;
