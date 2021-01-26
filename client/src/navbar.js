import {
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    makeStyles,
    alpha,
    InputBase,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector } from "react-redux";
import instance from "./axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    mytoolBar: {
        backgroundColor: "black",
        color: "white",
    },
    buttons: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        marginRight: 50,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const profileInfo = useSelector((state) => (state && state.userInfo) || {});

    const [value, setValue] = useState("");

    const handleLogOut = () => {
        console.log("clicking works");
        instance.get("/log-out").then(() => {
            location.replace("/");
        });
    };

    return (
        <>
            <AppBar
                position="fixed"
                variant="dense"
                aria-label="upper-bar"
                color="secondary"
            >
                <Toolbar className={classes.mytoolBar}>
                    <Typography variant="h6" className={classes.title}>
                        photoMe
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            onchange={(e) => setValue(e.target.value)}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ "aria-label": "search" }}
                        />
                    </div>
                    <Avatar
                        src={
                            (profileInfo.profile_pic &&
                                profileInfo.profile_pic) ||
                            "./default.jpg"
                        }
                        alt="users profile picture"
                        className={classes.buttons}
                    ></Avatar>
                    <IconButton aria-label="home" color="inherit" href="/">
                        <HomeIcon className={classes.buttons} />
                    </IconButton>
                    <IconButton
                        aria-label="pm"
                        color="inherit"
                        href="/messages"
                    >
                        <ChatBubbleOutlineIcon className={classes.buttons} />
                    </IconButton>
                    <IconButton
                        aria-label="logout"
                        color="inherit"
                        onClick={handleLogOut}
                    >
                        <ExitToAppIcon className={classes.buttons} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </>
    );
};

export default NavBar;
