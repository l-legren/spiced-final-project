import { Component } from "react";
import { Link } from "react-router-dom";
import instance from "./axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// MAETRIAL UI
import { Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import {
    TextField,
    Grid,
    Container,
    FormControl,
    Radio,
    FormLabel,
    RadioGroup,
    FormControlLabel,
} from "@material-ui/core";

import { addUserInfo } from "./actions";

const RegistrationForm = () => {
    const dispatch = useDispatch();

    const [city, setCity] = useState("");
    const [model, setModel] = useState(false);
    const [photographer, setPhotographer] = useState(false);
    const [value, setValue] = useState('model')

    return (
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
                                startIcon={<Icon>arrow_upward</Icon>}
                                // onClick={handleClick}
                            >
                                Submit
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

export default RegistrationForm;
