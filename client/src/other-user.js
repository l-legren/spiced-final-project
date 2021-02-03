import {
    Grid,
    Typography,
    Box,
    IconButton,
    makeStyles,
    Divider,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOtherUserInfo, getPmUsers } from "./actions.js";
import instance from "./axios.js";
import OtherUserImageBoard from "./other-user-imageboard";
import CameraIcon from "@material-ui/icons/Camera";
import ChatLayout from "./pmlayout.js";
import { modalFirstMessage } from "./actions";
import FirstMessageDialog from "./firstmessage";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
        background: "#f2f2f2",
        color: "black",
        borderRadius: 5,
    },
    buttons: {
        margin: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const OtherUser = ({ props }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userInfo = useSelector(
        (state) => (state && state.otherUserInfo) || {}
    );
    const chatState = useSelector(
        (state) => (state && state.chatState) || false
    );

    // const [chatVisible, setChatVisible] = useState(false);
    const [userInDatabase, setUserInDatabase] = useState(true);

    useEffect(() => {
        // console.log("Mounted, props: ", props);
        instance
            .get("/user-info/" + props.match.params.id)
            .then(({ data }) => {
                // console.log("Data from server: ", data);
                if (props.match.params.id == data.loggedId) {
                    props.history.push("/");
                }
                if (data.success == false) {
                    setUserInDatabase(false);
                }
                dispatch(addOtherUserInfo(data.data));
            })
            .catch((err) =>
                console.log("Error fetching Data from Server: ", err)
            );
    }, []);

    const handleClickOpen = () => {
        dispatch(modalFirstMessage(true));
        dispatch(getPmUsers());
    };

    return (
        <>
            <FirstMessageDialog props={props} />
            <Grid
                container
                spacing={1}
                display="flex"
                justify="center"
                className={classes.root}
            >
                <Grid item md={1} lg={1} />
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Grid
                        item
                        style={{
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={
                                (userInfo.profile_pic &&
                                    userInfo.profile_pic) ||
                                "./default.jpg"
                            }
                            style={{
                                width: 250,
                                height: 250,
                                objectFit: "cover",
                                borderRadius: "50%",
                            }}
                        ></img>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <Grid container>
                        <Box
                            sx={{
                                marginLeft: "40px",
                                marginTop: "50px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "space-around",
                            }}
                        >
                            <Box>
                                <Typography variant="h4" color="initial">
                                    {userInfo.first} {userInfo.last}
                                </Typography>
                                <Divider variant="middle" />

                                <Typography variant="subtitle1" color="initial">
                                    {userInfo.city}.{" "}
                                    {userInfo.photographer
                                        ? "Photographer"
                                        : "Model"}
                                </Typography>
                                <Divider variant="middle" />

                                <Typography variant="subtitle1" color="initial">
                                    {userInfo.bio && userInfo.bio}
                                </Typography>
                                <IconButton
                                    aria-label="reach-out bottom"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClickOpen}
                                >
                                    <CameraIcon /> Reach out
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item md={2} lg={2} />
                <Grid item md={1} lg={1} />
            </Grid>
            <OtherUserImageBoard props={props} />
            {chatState && <ChatLayout />}
        </>
    );
};

export default OtherUser;
