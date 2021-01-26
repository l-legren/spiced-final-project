import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import { TextField, Grid, Container } from "@material-ui/core";
import instance from "./axios.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TextFieldsRounded } from "@material-ui/icons";

const Login = () => {
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
            <Typography
                variant="h4"
                color="initial"
                align="center"
                paragraph
                gutterBottom
            >
                Log In
            </Typography>
            <br></br>
            <form>
                <Container maxWidth="xs" align="center">
                    <Grid container spacing={3} direction="column">
                        <Grid item>
                            <TextField
                                id="email"
                                type="email"
                                label='Mail'
                                variant="standard"
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                required
                            ></TextField>
                        </Grid>
                        <Grid item>
                            <TextField
                                variant='standard'
                                type="password"
                                label='Password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            ></TextField>
                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                startIcon={<Icon>arrow_upward</Icon>}
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
                            gutterBottom={true}
                        >
                            <Link to="/reset">Forgot your password?</Link>
                        </Typography>
                    </Grid>
                </Container>
            </form>
        </>
    );
};

export default Login;
