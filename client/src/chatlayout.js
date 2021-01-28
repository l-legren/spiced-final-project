import { TextField, Box, Grid, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addNewMessage,
    getUserInfo,
} from "./actions";
import { socket } from "./socket";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    myText: {
        position: "fixed",
        bottom: 5,
        right: 5,
    },
    bubbleUser: {
        display: "inline-block",
        background: "#ff9933",
        color: "white",
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    bubbleThird: {
        display: "inline-block",
        background: "#0099ff",
        color: "white",
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
}));

const ChatLayout = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const messages = useSelector(
        (state) => (state && state.messagesWithUser) || []
    );
    const myUser = useSelector((state) => (state && state.userInfo) || {});

    const handleKeyDown = (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            var arrofIds = messages.map((prop) => prop.id);
            console.log("user pressed enter!", myUser);
            socket.emit("new chat message", {
                message: e.target.value,
                ids: arrofIds,
            });
            dispatch(
                addNewMessage({
                    message: e.target.value,
                    id: myUser.id,
                    first: myUser.first,
                    last: myUser.last,
                })
            );
            e.target.value = null;
        }
    };

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    const typ = (first, last, message) => (
        <>
            <Typography variant="body2" color="inherit">
                {first} {last}
            </Typography>
            <Typography variant="subtitle1" color="inherit">
                {message}
            </Typography>
        </>
    );

    return (
        <div>
            <Grid container spacing={1} direction="column">
                <Grid
                    item
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        justifyContent: "flex-end",
                    }}
                >
                    {messages.map((msg, idx) => {
                        return myUser.id == msg.id ? (
                            <div key={idx} style={{ alignSelf: "end" }}>
                                <Box key={idx} className={classes.bubbleUser}>
                                    {typ(msg.first, msg.last, msg.message)}
                                </Box>
                            </div>
                        ) : (
                            <div key={idx}>
                                <Box key={idx} className={classes.bubbleThird}>
                                    {typ(msg.first, msg.last, msg.message)}
                                </Box>
                            </div>
                        );
                    })}
                </Grid>
                <Grid
                    item
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <TextField
                        className={classes.myText}
                        variant="outlined"
                        defaultValue=""
                        multiline
                        rows={2}
                        autoFocus
                        onKeyDown={handleKeyDown}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default ChatLayout;
