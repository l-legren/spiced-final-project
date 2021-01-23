import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";
import instance from "./axios";
import { getUserInfo, addBio } from "./actions";
import EditBio from "./editbio";

const Profile = () => {
    const dispatch = useDispatch();
    const profileInfo = useSelector((state) => (state && state.userInfo) || {});

    return (
        <>
            <Grid container spacing={1} display="flex" justify="center">
                <Grid item xs={12} md={6} lg={3}>
                    <img src={profileInfo.profilePic || "./default.jpg"}></img>
                </Grid>
                <EditBio />
                <Grid item xs={12} md={6} lg={3}>
                    NOSE
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
