import {
    IconButton,
    Box,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import {
    chatVisibility,
    getPmUsers,
    getMessagesWithUser,
    getUserInfo,
} from "./actions";
import { useEffect } from "react";
import ChatLayout from "./chatlayout";

const PrivateMessages = () => {
    const dispatch = useDispatch();

    const pmUsers = useSelector((state) => (state && state.pmUsers) || []);
    var loggedUser = useSelector((state) => (state && state.userInfo) || {});

    function filterUsers(user) {
        return user.id != loggedUser.id;
    }

    const filtered = pmUsers.filter(filterUsers);

    const selectUser = (e) => {
        console.log("click works", e);
        dispatch(getMessagesWithUser(e));
    };

    useEffect(() => {
        dispatch(getPmUsers());
        dispatch(getUserInfo());
    }, []);

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={5} md={4} lg={3}>
                    <Box sx={{ height: "100vh" }}>
                        <List>
                            {filtered.map((user, idx) => {
                                return (
                                    <div key={idx}>
                                        <ListItem
                                            key={user.id}
                                            onClick={() => selectUser(user.id)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={user.profile_pic}
                                                    alt={`${user.first} ${user.last}`}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`${user.first} ${user.last}`}
                                            />
                                        </ListItem>
                                        <Divider
                                            variant="inset"
                                            component="li"
                                        />
                                    </div>
                                );
                            })}
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={7} md={8} lg={9}>
                    <ChatLayout />
                </Grid>
            </Grid>
        </div>
    );
};

export default PrivateMessages;

// const handleClose = () => {
//     dispatch(chatVisibility(false));
// };

// const chatBubbles = dummyData.map((obj, idx = 0) => (
//     <div key={idx} className={classes.bubbleContainer}>
//         <div key={idx++} className={classes.bubble}>
//             <div className={classes.button}>{obj.message}</div>
//         </div>
//     </div>
// ));

// <Box
//     sx={{ height: 20, backgroundColor: "black" }}
//     onClick={handleClose}
//     >
//     <IconButton>
//         <CloseIcon color="primary" />
//     </IconButton>
// </Box>
