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
import { chatVisibility, getPmUsers, getMessagesWithUser } from "./actions";
import { useEffect } from "react";
import ChatLayout from "./chatlayout";

const useStyles = makeStyles((theme) => ({
    container: {
        bottom: 5,
        right: 5,
        height: "auto",
        position: "fixed",
        border: "2px solid black",
        borderRadius: "5px",
    },
    bubbleContainer: {
        width: "100%",
        display: "flex",
    },
    bubble: {
        border: "0.5px solid black",
        borderRadius: "10px",
        margin: "5px",
        padding: "10px",
        display: "inline-block",
    },
}));

const PrivateMessages = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const pmUsers = useSelector((state) => (state && state.pmUsers) || []);
    const selectUser = (e) => {
        console.log("click works", e);
        dispatch(getMessagesWithUser(e));
    };

    useEffect(() => {
        dispatch(getPmUsers());
    }, []);

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={4} lg={3}>
                    <Box flexGrow={1}>
                        <List>
                            {pmUsers.map((user, idx) => {
                                return (
                                    <div key={idx}>
                                        <ListItem
                                            key={user.id}
                                            onClick={() => selectUser(user.id)}
                                            data-my-value={user.id}
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
                {/* <Divider orientation="vertical" flexItem></Divider> */}
                <Grid item xs={12} sm={12} md={8} lg={9}>
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
