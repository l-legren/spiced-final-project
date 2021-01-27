import { Button, Box, Grid, Divider, makeStyles } from "@material-ui/core";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageboardModalVisible, getUserImageboard } from "./actions";
import UploaderImageboard from "./uploader-imageboard";

const randomImages = [
    "/abstract1.jpg",
    "/abstract2.jpg",
    "/abstract3.jpg",
    "/abstract4.jpg",
    "/abstract5.jpg",
];

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 5,
        background: "#f2f2f2",
        color: "black",
        borderRadius: 5,
    },
    button: {
        background: "black",
        color: "#f2f2f2",
    },
}));

const UserImageBoard = () => {
    const classes = useStyles();
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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 5,
                    background: `url(${
                        randomImages[
                            Math.floor(Math.random() * randomImages.length)
                        ]
                    })`,
                    backgroundSize: "cover",
                }}
            >
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                >
                    UPLOAD IMAGE
                </Button>
            </Box>
            <Divider variant="middle" />
            <UploaderImageboard />
            <Grid container spacing={1} className={classes.root}>
                <Grid item md={1} lg={1}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10}>
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
                <Grid item md={1} lg={1}>
                    <div></div>
                </Grid>
            </Grid>
        </>
    );
};

export default UserImageBoard;
