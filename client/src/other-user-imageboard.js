import { Box, Grid, Typography } from "@material-ui/core";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUserImageboard } from "./actions";
import { randomImages } from "./user-imageboard";

const OtherUserImageBoard = ({ props }) => {
    const dispatch = useDispatch();
    const otherUserImageboard = useSelector(
        (state) => (state && state.imageboardPicsOtherUser) || []
    );

    useEffect(() => {
        dispatch(getOtherUserImageboard(props.match.params.id));
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
            ></Box>
            <Grid container spacing={1}>
                <Grid item md={1} lg={2}></Grid>
                <Grid item xs={12} sm={12} md={10} lg={8}>
                    {otherUserImageboard.length == 0 && (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <img src="/no-images.png" />
                            </Box>
                            <Typography
                                variant="h4"
                                color="initial"
                                align="center"
                            >
                                No images to show
                            </Typography>
                        </>
                    )}
                    <ImageList variant="masonry" cols={3} gap={8}>
                        {otherUserImageboard.map((pic, idx) => {
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
                <Grid item md={1} lg={2}></Grid>
            </Grid>
        </>
    );
};

export default OtherUserImageBoard;
