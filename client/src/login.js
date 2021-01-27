import {
    TextField,
    Grid,
    Container,
    Hidden,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Icon,
    makeStyles,
} from "@material-ui/core";
import instance from "./axios.js";
import { useState } from "react";
import { Link } from "react-router-dom";

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

const Login = () => {
    const classes = useStyle();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleClick = () => {
        console.log("Clicking works!!!");
        let obj = {
            email: email,
            password: password,
        };
        instance
            .post("/login", obj)
            .then((obj) => {
                console.log("This is my reg object: ", obj);
                location.replace("/");
                setError(false);
            })
            .catch((err) => {
                console.log("Error sending post to the server: ", err);
                setError(true);
            });
    };

    return (
        <>
            <AppBar position="fixed" color="primary">
                <Toolbar className={classes.mytoolBar}>
                    <Typography variant="h6" className={classes.title}>
                        photoMe
                    </Typography>
                    <Button variant="text" color="primary" href='/'>
                        Sign up
                    </Button>
                    <Button variant="text" color="primary" href='/login'>
                        Log in
                    </Button>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
            <Grid container spacing={1} style={{ height: "100vh" }}>
                <Hidden mdDown>
                    <Grid item md={6} lg={6}>
                        <div style={{ height: "100vh" }}>
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
                                        id="email"
                                        type="email"
                                        label="Mail"
                                        variant="standard"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        autoFocus
                                        required
                                    ></TextField>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        variant="standard"
                                        type="password"
                                        label="Password"
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
                                        onClick={handleClick}
                                    >
                                        Log In
                                    </Button>
                                </Grid>
                                <br></br>
                                <br></br>
                                <Typography
                                    variant="subtitle1"
                                    color="initial"
                                    align="center"
                                    paragraph
                                    gutterBottom
                                >
                                    <Link to="/reset">
                                        Forgot your password?
                                    </Link>
                                </Typography>
                            </Grid>
                        </Container>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

export default Login;
