import { Component } from "react";
import { Link } from "react-router-dom";
import instance from "./axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// MAETRIAL UI
import {
    Button,
    FormControl,
    Radio,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Typography,
    TextField,
    Grid,
    Container,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

const Registration = () => {
    const dispatch = useDispatch();
    // VIEW 1
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [view, setView] = useState(1);
    const [error, setError] = useState(false);

    // VIEW 2
    const [city, setCity] = useState("");
    const [model, setModel] = useState(false);
    const [photographer, setPhotographer] = useState(false);
    const [value, setValue] = useState("model");

    const handleClickAndView = () => {
        console.log("Clicking works!!!");
        let obj = {
            ...obj,
            first: first,
            last: last,
            email: email,
            password: password,
        };
        instance
            .post("/registration", obj)
            .then(({ data }) => {
                console.log("This is data from Databse: ", data);
                setView(2);
                setError(false);
            })
            .catch((err) => {
                console.log("Error sending post to the server: ", err);
                setError(true);
            });
    };

    const handleSubmit = () => {
        console.log("Clicking works!!!");
        let obj = {
            city: city,
            model: model,
            photographer: photographer,
        };
        instance
            .post("/registration-second", obj)
            .then(({ data }) => {
                console.log("This is data from Databse: ", data);
                location.replace("/");
                setError(false);
            })
            .catch((err) => {
                console.log("Error sending post to the server: ", err);
                setError(true);
            });
        console.log("This is my final object", obj);
    };

    return view == 1 ? (
        <>
            <Typography
                variant="h4"
                color="initial"
                align="center"
                gutterBottom
            >
                Sign Up
            </Typography>
            <br></br>
            <Container maxWidth="xs" align="center">
                <Grid container spacing={3} direction="column">
                    <Grid item>
                        <TextField
                            name="first"
                            label="First"
                            type="text"
                            variant="standard"
                            onChange={(e) => setFirst(e.target.value)}
                            required
                        ></TextField>
                    </Grid>
                    <Grid item>
                        <TextField
                            name="last"
                            type="text"
                            label="Last"
                            variant="standard"
                            onChange={(e) => setLast(e.target.value)}
                            required
                        ></TextField>
                    </Grid>
                    <Grid item>
                        <TextField
                            name="email"
                            type="email"
                            label="Mail"
                            variant="standard"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></TextField>
                    </Grid>
                    <Grid item>
                        <TextField
                            name="password"
                            type="password"
                            label="Password"
                            variant="standard"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></TextField>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleClickAndView}
                        >
                            GO ON
                        </Button>
                    </Grid>
                </Grid>
                <br></br>
                <br></br>
                <Typography
                    variant="subtitle1"
                    color="initial"
                    align="center"
                    gutterBottom
                >
                    You already registered? Please{" "}
                    <Link to="/login">log in here </Link>
                </Typography>
            </Container>
        </>
    ) : (
        <>
            <Typography
                variant="h4"
                color="initial"
                align="center"
                gutterBottom
            >
                Sign Up
            </Typography>
            <br></br>
            <form>
                <Container maxWidth="xs" align="center">
                    <Grid container spacing={3} direction="column">
                        <Grid item>
                            <TextField
                                name="city"
                                label="City"
                                type="text"
                                variant="standard"
                                // onChange={(e) => setCity(e.target.value)}
                                required
                            ></TextField>
                        </Grid>
                        <Grid item>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    aria-label="Type"
                                    name="Type"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="model"
                                        control={<Radio />}
                                        label="Model"
                                    />
                                    <FormControlLabel
                                        value="photographer"
                                        control={<Radio />}
                                        label="Photographer"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                SUBMIT
                            </Button>
                        </Grid>
                    </Grid>
                    <br></br>
                    <br></br>
                    <Typography
                        variant="subtitle1"
                        color="initial"
                        align="center"
                        gutterBottom
                    >
                        You already registered? Please{" "}
                        <Link to="/login">log in here </Link>
                    </Typography>
                </Container>
            </form>
        </>
    );
};

export default Registration;
