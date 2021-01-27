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
    AppBar,
    Toolbar,
    makeStyles,
    Hidden,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    mytoolBar: {
        backgroundColor: "black",
        color: "white",
    },
    buttons: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Registration = () => {
    const dispatch = useDispatch();
    const classes = useStyle();
    // VIEW 1
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [view, setView] = useState(1);
    const [error, setError] = useState(false);
    const [userId, setUserId] = useState("");

    // VIEW 2
    const [city, setCity] = useState("");
    const [value, setValue] = useState("model");

    const handleClickAndView = () => {
        console.log("Clicking works!!!");
        let obj = {
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
                setUserId(data.id);
                setError(false);
            })
            .catch((err) => {
                console.log("Error sending post to the server: ", err);
                setError(true);
            });
    };

    const handleSubmit = () => {
        let obj = {
            id: userId,
            city: city,
            model: value == "model" ? true : false,
            photographer: value == "photographer" ? true : false,
        };
        console.log("Clicking works!!!", obj);
        instance
            .post("/reg-second-step", obj)
            .then(() => {
                console.log("This is data from Databse: ");
                setError(false);
                location.replace("/");
            })
            .catch((err) => {
                console.log("Error sending post to the server: ", err);
                setError(true);
            });
    };

    return view == 1 ? (
        <>
            <AppBar position="fixed" color="primary">
                <Toolbar className={classes.mytoolBar}>
                    <Typography variant="h6" className={classes.title}>
                        photoMe
                    </Typography>
                    <Button variant="text" color="primary" href='/'>
                        Sign up
                    </Button>
                    <Button variant="text" color="primary" href='/welcome#/login'>
                        Log in
                    </Button>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
            <Grid container spacing={1} style={{ height: "100vh" }}>
                <Hidden mdDown>
                    <Grid item sm={0} md={6} lg={6}>
                        <div style={{height:'100vh'}}>
                            <img
                                src="/cover.jpg"
                                style={{
                                    overflow: "hidden",
                                    objectFit: "cover",
                                    maxWidth: "auto",
                                    maxHeight: "100%",
                                }}
                            />
                        </div>
                    </Grid>
                </Hidden>
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <form>
                        <Container maxWidth="xs" align="center">
                            <Grid container spacing={3} direction="column">
                                <Grid item>
                                    <TextField
                                        name="first"
                                        label="First"
                                        type="text"
                                        variant="standard"
                                        onChange={(e) =>
                                            setFirst(e.target.value)
                                        }
                                        required
                                    ></TextField>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        name="last"
                                        type="text"
                                        label="Last"
                                        variant="standard"
                                        onChange={(e) =>
                                            setLast(e.target.value)
                                        }
                                        required
                                    ></TextField>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        name="email"
                                        type="email"
                                        label="Mail"
                                        variant="standard"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    ></TextField>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        name="password"
                                        type="password"
                                        label="Password"
                                        variant="standard"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
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
                    </form>
                </Grid>
            </Grid>
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
                                onChange={(e) => setCity(e.target.value)}
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
                                type="button"
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
