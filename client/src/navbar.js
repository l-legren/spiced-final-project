import {
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    makeStyles
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useSelector } from "react-redux";
import instance from "./axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    mytoolBar: {
        backgroundColor: 'black',
        color: 'white'
    },
    buttons: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const profileInfo = useSelector((state) => (state && state.userInfo) || {});

    const history = useHistory();

    const handleLogOut = () => {
        console.log("clicking works");
        instance.get("/log-out").then(() => {
            history.go(0);
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
                        <ChatBubbleOutlineIcon  className={classes.buttons} />
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
