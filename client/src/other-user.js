import { Grid, Typography, Box, IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOtherUserInfo, chatVisibility } from "./actions.js";
import instance from "./axios.js";
import OtherUserImageBoard from "./other-user-imageboard";
import CameraIcon from "@material-ui/icons/Camera";
import { flexbox } from "@material-ui/system";
import ChatLayout from "./chatlayout.js";

const OtherUser = ({ props }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(
        (state) => (state && state.otherUserInfo) || {}
    );
    const chatState = useSelector((state => state && state.chatState || false));

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

    const handleClick = () => {
        console.log("click works");
        // setChatVisible(true);
        dispatch(chatVisibility(true));
    };

    return (
        <>
            <Grid container spacing={1} display="flex" justify="center">
                <Grid item xs={12} md={3} lg={3}>
                    <Grid item>
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
                            }}
                        ></img>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <Grid container>
                        <Box
                            sx={{
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

                                <Typography variant="subtitle1" color="initial">
                                    {userInfo.bio && userInfo.bio}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    height: 40,
                                }}
                            ></Box>
                            <IconButton
                                aria-label=""
                                variant="contained"
                                color="primary"
                                onClick={handleClick}
                            >
                                <CameraIcon /> Contact me
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{ height: 100 }}></Box>
            <OtherUserImageBoard props={props} />
            {chatState && <ChatLayout />}
        </>
    );
};

export default OtherUser;
