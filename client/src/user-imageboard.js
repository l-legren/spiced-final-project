import { Button, Box, Grid } from "@material-ui/core";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageboardModalVisible, getUserImageboard } from "./actions";
import UploaderImageboard from "./uploader-imageboard";

const UserImageBoard = () => {
    const dispatch = useDispatch();
    const userImageboard = useSelector(
        (state) => (state && state.imageboardPicsUser) || []
    );

    const handleClickOpen = () => {
        dispatch(imageboardModalVisible());
    };

    useEffect(() => {
        dispatch(getUserImageboard());
    }, []);

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", padding: 5 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                >
                    UPLOAD IMAGE
                </Button>
            </Box>
            <UploaderImageboard />
            <Grid container spacing={1}>
                <Grid item xs={0} sm={0} md={1} lg={3}></Grid>
                <Grid item xs={12} sm={12} md={10} lg={6}>
                    <ImageList variant="masonry" cols={3} gap={8}>
                        {userImageboard.map((pic, idx) => {
                            return (
                                <ImageListItem key={idx}>
                                    <img
                                        srcSet={pic.url}
                                        alt={`Image ${pic.id} of user ${pic.user_id}`}
                                    />
                                </ImageListItem>
                            );
                        })}
                    </ImageList>
                </Grid>
                <Grid item xs={0} sm={0} md={1} lg={3}></Grid>
            </Grid>
        </>
    );
};

export default UserImageBoard;
