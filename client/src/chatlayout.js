import { IconButton, Box } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { chatVisibility } from "./actions";

const useStyles = makeStyles((theme) => ({
    container: {
        bottom: 5,
        right: 5,
        height: 450,
        width: 300,
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

const ChatLayout = () => {
    const classes = useStyles();
    const dummyData = [
        {
            message: "1: This should be in left",
            direction: "left",
        },
        {
            message: "2: This should be in right",
            direction: "right",
        },
        {
            message: "3: This should be in left again",
            direction: "left",
        },
    ];

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(chatVisibility(false));
    };

    const chatBubbles = dummyData.map((obj, idx = 0) => (
        <div key={idx} className={classes.bubbleContainer}>
            <div key={idx++} className={classes.bubble}>
                <div className={classes.button}>{obj.message}</div>
            </div>
        </div>
    ));
    return (
        <>
            <div className={classes.container}>
                <Box
                    sx={{ height: 20, backgroundColor: "black" }}
                    onClick={handleClose}
                >
                    <IconButton>
                        <CloseIcon color="primary" />
                    </IconButton>
                </Box>
                {chatBubbles}
            </div>
        </>
    );
};

export default ChatLayout;
