import { Box } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./navbar";
import Profile from "./profile";
import { getUserInfo } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import OtherUser from "./other-user";
import PrivateMessages from "./pmlayout";
import CityUsers from "./cityusers";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <BrowserRouter>
                <NavBar />

                <Route exact path="/" render={() => <Profile />} />
                <Route
                    path="/users/:id"
                    render={(props) => <OtherUser props={props} />}
                />
                <Route path="/messages" render={() => <PrivateMessages />} />
                <Route path="/city-users" render={() => <CityUsers />} />
            </BrowserRouter>
        </Box>
    );
};

export default App;
