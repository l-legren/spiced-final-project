import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Box, Button, TextField } from "@material-ui/core";
import instance from "./axios";
import { getUserInfo, addBio, picModalVisible } from "./actions";
import EditBio from "./editbio";
import Uploader from "./uploader";
import UserImageBoard from "./user-imageboard";
import {
    ImageList,
    ImageListItem,
    makeStyles,
    Divider,
} from "@material-ui/core";

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

const Profile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const profileInfo = useSelector((state) => (state && state.userInfo) || {});

    const handleClickOpen = () => {
        dispatch(picModalVisible());
    };

    return (
        <>
            <Uploader />
            <Grid
                container
                spacing={1}
                display="flex"
                justify="center"
                className={classes.root}
            >
                <Grid item md={1} lg={1} />
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <a
                        style={{
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={
                                (profileInfo.profile_pic &&
                                    profileInfo.profile_pic) ||
                                "./default.jpg"
                            }
                            alt="users profile picture"
                            style={{
                                width: 250,
                                height: 250,
                                objectFit: "cover",
                                borderRadius: "50%",
                            }}
                            onClick={handleClickOpen}
                        ></img>
                    </a>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <Box
                        sx={{
                            marginLeft: '40px',
                            marginTop: '50px',
                        }}
                    >
                        <EditBio />
                    </Box>
                </Grid>
                <Grid item md={2} lg={2} />
                <Grid item md={1} lg={1} />
            </Grid>
            <Divider variant="middle" />
            <UserImageBoard />
        </>
    );
};

export default Profile;
