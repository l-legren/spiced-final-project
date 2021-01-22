import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import { OutlinedInput, Grid, Container } from "@material-ui/core";
import instance from "./axios.js";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [view, setView] = useState(1);
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleClick = () => {
        console.log("Clicking works!!!");
        let obj = {
            email: email,
        };
        instance
            .post("/password/reset/start", obj)
            .then(() => {
                setError(false);
                setView(2);
            })
            .catch((err) => {
                console.log("Error sending post to the server: ", err);
                setError(true);
            });
    };

    const handleConfirm = () => {
        let obj = {
            email: email,
            code: code,
            newPassword: newPassword,
        };
        instance
            .post("/password/reset/confirm", obj)
            .then(() => {
                setError(false);
                setView(3);
            })
            .catch((err) => {
                console.log("Error on the Server: ", err);
                setError(true);
            });
    };

    return (
        <>
            {view == 1 ? (
                <>
                    <Typography
                        variant="h4"
                        color="initial"
                        align="center"
                        paragraph={true}
                        gutterBottom={true}
                    >
                        Enter your Mail
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="initial"
                        align="center"
                        paragraph={true}
                        gutterBottom={true}
                    >
                        We will send you a Code
                    </Typography>
                    <br></br>
                    <Container maxWidth="xs" align="center">
                        <Grid container spacing={3} direction="column">
                            <FormControl>
                                <FormLabel>Mail</FormLabel>
                                <OutlinedInput
                                    name="email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required={true}
                                ></OutlinedInput>
                            </FormControl>
                        </Grid>
                        <br></br>
                        <br></br>
                        <Grid item spacing={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={handleClick}
                            >
                                Send Code
                            </Button>
                        </Grid>
                    </Container>
                </>
            ) : view == 2 ? (
                <>
                    <Typography
                        variant="h4"
                        color="initial"
                        align="center"
                        paragraph={true}
                        gutterBottom={true}
                    >
                        Enter your Mail
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="initial"
                        align="center"
                        paragraph={true}
                        gutterBottom={true}
                    >
                        We will send you a Code
                    </Typography>
                    <br></br>
                    <Container maxWidth="xs" align="center">
                        <Grid container spacing={3} direction="column">
                            <FormControl>
                                <FormLabel>Code</FormLabel>
                                <OutlinedInput
                                    name="code"
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required={true}
                                ></OutlinedInput>
                            </FormControl>
                            <FormControl>
                                <FormLabel>New Password</FormLabel>
                                <OutlinedInput
                                    name="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    required={true}
                                ></OutlinedInput>
                            </FormControl>
                        </Grid>
                        <br></br>
                        <br></br>
                        <Grid item spacing={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={handleConfirm}
                            >
                                Confirm Code
                            </Button>
                        </Grid>
                    </Container>
                </>
            ) : (
                <>
                    <Typography
                        variant="h4"
                        color="initial"
                        align="center"
                        paragraph={true}
                        gutterBottom={true}
                    >
                        Password successfull restored!
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="initial"
                        align="center"
                        paragraph={true}
                        gutterBottom={true}
                    >
                        You can now <Link to="/login">log in here</Link>.
                    </Typography>
                </>
            )}
        </>
    );
};

export default ResetPassword;
