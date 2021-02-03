import {
    Grid,
    Box,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    FormControl,
    Typography,
    Switch,
} from "@material-ui/core/";
import { useState } from "react";
import { useSelector } from "react-redux";

const CityUsers = () => {
    const usersFoundInCity = useSelector(
        (state) => (state && state.usersInCity) || []
    );

    const onlyModels = usersFoundInCity.filter((user) => user.model);
    const onlyPhotographers = usersFoundInCity.filter(
        (user) => user.photographer
    );

    const [models, setModels] = useState(true);

    console.log("Models", onlyModels);
    console.log("Photographers", onlyPhotographers);

    const [type, setType] = useState("models");

    return (
        <>
            <Box
                sx={{
                    height: "180px",
                    // backgroundImage: "url(/berlin.jpg)",
                    // backgroundSize: "cover",
                    // opacity: 0.8,
                    border: "1px solid black",
                    borderRadius: 5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <FormControl
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4" color="initial">
                        What are you looking for?
                    </Typography>
                    <br></br>
                    <br></br>
                    <Grid
                        container
                        spacing={1}
                        justifyContent="center"
                        alignItems="flex-end"
                    >
                        <Grid item xs={4}>
                            <Typography variant="subtitle1" color="initial">
                                Models
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Switch
                                onChange={() =>
                                    models ? setModels(false) : setModels(true)
                                }
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subtitle1" color="initial">
                                Photographers
                            </Typography>
                        </Grid>
                    </Grid>
                </FormControl>
            </Box>
            <Box>
                <Grid container spacing={1}>
                    <Grid item md={1} lg={1}></Grid>
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                        <ImageList variant="masonry" cols={3} gap={2}>
                            {(models ? onlyModels : onlyPhotographers).map(
                                (user, idx) => {
                                    return (
                                        <a key={idx} href={`/users/${user.id}`}>
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
                                        </a>
                                    );
                                }
                            )}
                        </ImageList>
                    </Grid>
                    <Grid item md={1} lg={1}></Grid>
                </Grid>
            </Box>
        </>
    );
};

export default CityUsers;
