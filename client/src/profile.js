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
import { ImageList, ImageListItem, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 5,
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
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <a style={{ cursor: "pointer" }}>
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
                            }}
                            onClick={handleClickOpen}
                        ></img>
                    </a>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                    <EditBio />
                </Grid>
            </Grid>
            <UserImageBoard />
        </>
    );
};

export default Profile;
