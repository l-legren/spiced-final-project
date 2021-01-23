import { Component } from "react";
import { Link } from "react-router-dom";
import instance from "./axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// MAETRIAL UI
import { Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import { OutlinedInput, Grid, Container } from "@material-ui/core";

import { addUserInfo } from "./actions";

const Registration = () => {
    const dispatch = useDispatch();

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleClick = () => {
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
                // dispatch(addUserInfo(data));
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
                gutterBottom={true}
            >
                Sign Up
            </Typography>
            <br></br>
            <Container maxWidth="xs" align="center">
                <Grid container spacing={3} direction="column">
                    <FormControl>
                        <FormLabel justify="left">First Name</FormLabel>
                        <OutlinedInput
                            name="first"
                            type="text"
                            value={first}
                            onChange={(e) => setFirst(e.target.value)}
                            required
                            paragraph
                        ></OutlinedInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <OutlinedInput
                            name="last"
                            type="text"
                            value={last}
                            onChange={(e) => setLast(e.target.value)}
                            required={true}
                            paragraph
                        ></OutlinedInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Mail</FormLabel>
                        <OutlinedInput
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                            paragraph
                        ></OutlinedInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <OutlinedInput
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                            paragraph
                        ></OutlinedInput>
                    </FormControl>
                    <Grid item spacing={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            startIcon={<Icon>arrow_upward</Icon>}
                            onClick={handleClick}
                            paragraph
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
                    paragraph={true}
                    gutterBottom={true}
                >
                    You already registered? Please{" "}
                    <Link to="/login">log in here </Link>
                </Typography>
            </Container>
        </>
    );
};

export default Registration;

// export default class Registration extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             error: null,
//         };
//     }

//     handleChange(e) {
//         // console.log("Handling Change!");
//         this.setState(
//             {
//                 [e.target.name]: e.target.value,
//             },
//             () => console.log(this.state)
//         );
//     }

//     handleClick() {
//         console.log("Clicking works!!!");
//         let obj = this.state;
//         instance
//             .post("/registration", obj)
//             .then((obj) => {
//                 console.log("This is my reg object: ", obj);
//                 location.replace("/");
//                 this.setState({
//                     error: null,
//                 });
//             })
//             .catch((err) => {
//                 console.log("Error sending post to the server: ", err);
//                 this.setState({
//                     error: true,
//                 });
//             });
//     }

//     render() {
//         return (
//             <>
//                 <h1 style={{ textAlign: "center" }}>
//                     Join our Community!
//                 </h1>
//             <br></br>
//             <br></br>
//                 <input
//                     name="first"
//                     type="text"
//                     onChange={(e) => this.handleChange(e)}
//                     placeholder="First Name"
//                     required
//                 ></input>
//             <br></br>
//                 <input
//                     name="last"
//                     type="text"
//                     onChange={(e) => this.handleChange(e)}
//                     placeholder="Last Name"
//                     required
//                 ></input>
//             <br></br>
//                 <input
//                     name="email"
//                     type="email"
//                     onChange={(e) => this.handleChange(e)}
//                     placeholder="E-Mail"
//                     required
//                 ></input>
//             <br></br>
//                 <input
//                     name="password"
//                     type="password"
//                     onChange={(e) => this.handleChange(e)}
//                     placeholder="Password"
//                     required
//                 ></input>
//             <br></br>
//             <div id="reg-wrapper">
//                 <Button
//                     onClick={() => this.handleClick()}
//                     type="submit"
//                 >
//                     Submit!
//                 </Button>
//                 {this.state.error && (
//                     <p style={{ color: "red" }}>
//                         Something broke! Please fill in missing
//                         fields above!
//                     </p>
//                 )}
//                 <br></br>
//                 <p>Already a member?</p>
//                 <Link to="/login">Click here to log in</Link>
//             </div>
//             </>
//         );
//     }
// }
