import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";
import instance from "./axios";
import { getUserInfo, addBio, picModalVisible } from "./actions";
import EditBio from "./editbio";
import Uploader from "./uploader";

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
                <Grid item xs={12} md={6} lg={6}>
                    <img
                        src={
                            (profileInfo.profile_pic &&
                                profileInfo.profile_pic) ||
                            "./default.jpg"
                        }
                        style={{ width: 250, height: 250 }}
                        onClick={handleClickOpen}
                    ></img>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <EditBio />
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
