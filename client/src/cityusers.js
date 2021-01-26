import {
    Grid,
    Box,
    ImageList,
    ImageListItem,
    ImageListItemBar,
} from "@material-ui/core/";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usersInCity } from "./actions";

const CityUsers = () => {
    const usersFoundInCity = useSelector(
        (state) => (state && state.usersInCity) || []
    );

    return (
        <>
            <Box></Box>
            <Box></Box>
            <Box>
                <Grid container spacing={1}>
                    <Grid item md={1} lg={1}></Grid>
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                        <ImageList variant="masonry" cols={3} gap={2}>
                            {usersFoundInCity.map((user, idx) => {
                                return (
                                    <>
                                        <ImageListItem key={idx}>
                                            <img
                                                style={{
                                                    width: 300,
                                                    height: 300,
                                                    objectFit: "cover",
                                                }}
                                                srcSet={user.profile_pic}
                                                alt={`Profile image of ${user.first}`}
                                            />
                                            <ImageListItemBar
                                                title={`${user.first} ${user.last}`}
                                                subtitle={
                                                    user.model
                                                        ? "Looking for Photographers"
                                                        : "Looking for Models"
                                                }
                                            />
                                        </ImageListItem>
                                    </>
                                );
                            })}
                        </ImageList>
                    </Grid>
                    <Grid item md={1} lg={1}></Grid>
                </Grid>
            </Box>
        </>
    );
};

export default CityUsers;
