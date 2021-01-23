import {
    makeStyles,
    Typography,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const profileInfo = useSelector((state) => (state && state.userInfo) || {});

    const handleClick = () => {
        console.log("clicking on menu");
    };

    return (
        <>
            <AppBar
                position="fixed"
                aria-label=""
                color="primary"
                className={classes.colorsBar}
            >
                <Toolbar>
                    <IconButton
                        aria-label="menu"
                        className={classes.menuButton}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
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
                    ></Avatar>
                    <IconButton aria-label="home" color="inherit">
                        <HomeIcon />
                    </IconButton>
                    <IconButton aria-label="pm" color="inherit">
                        <ChatBubbleOutlineIcon />
                    </IconButton>
                    <IconButton aria-label="logout" color="inherit">
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </>
    );
};

export default NavBar;
