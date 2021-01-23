import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOtherUserInfo } from "./actions.js";
import instance from "./axios.js";

const OtherUser = ({ props }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => (state && state.otherUserInfo) || {});

    const [userInDatabase, setUserInDatabase] = useState(true);

    useEffect(() => {
        // console.log("Mounted, props: ", props);
        instance
            .get("/user-info/" + props.match.params.id)
            .then(({ data }) => {
                // console.log("Data from server: ", data);
                if (props.match.params.id == data.loggedId) {
                    props.history.push("/");
                }
                if (data.success == false) {
                    setUserInDatabase(false);
                }
                dispatch(addOtherUserInfo(data.data));
            })
            .catch((err) =>
                console.log("Error fetching Data from Server: ", err)
            );
    },[]);

    return (
        <>
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
                                (userInfo.profile_pic &&
                                    userInfo.profile_pic) ||
                                "./default.jpg"
                            }
                            style={{ width: 250, height: 250, objectFit: 'cover' }}
                        ></img>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <>
                        <Typography variant="h4" color="initial">
                            {userInfo.first} {userInfo.last}
                        </Typography>

                        <Typography variant="subtitle1" color="initial">
                            {userInfo.bio && userInfo.bio}
                        </Typography>
                    </>
                </Grid>
            </Grid>
        </>
    );
};

export default OtherUser;
