import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";
import instance from "./axios";
import { getUserInfo, addBio, picModalVisible } from "./actions";
import EditBio from "./editbio";
import Uploader from "./uploader";
import UserImageBoard from "./user-imageboard";
import { ImageList, ImageListItem } from "@material-ui/core";

const Profile = () => {
    const dispatch = useDispatch();
    const profileInfo = useSelector((state) => (state && state.userInfo) || {});

    
    const handleClickOpen = () => {
        dispatch(picModalVisible());
    };

    return (
        <>
            <Uploader />
            <Grid container spacing={1} display="flex" justify="center">
                <Grid item xs={12} md={3} lg={3}>
                    <Grid
                        container
                        spacing={1}
                        display="flex"
                        justify="flex-end"
                    >
                        <img
                            src={
                                (profileInfo.profile_pic &&
                                    profileInfo.profile_pic) ||
                                "./default.jpg"
                            }
                            alt="users profile picture"
                            style={{ width: 250, height: 250 }}
                            onClick={handleClickOpen}
                        ></img>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <EditBio />
                </Grid>
            </Grid>
            <UserImageBoard />
        </>
    );
};

export default Profile;
