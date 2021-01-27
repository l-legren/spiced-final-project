import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    makeStyles,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
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
}));

const NavBarReg = () => {
    const classes = useStyle();

    return (
        <>
            <AppBar position="fixed" color="primary">
                <Toolbar className={classes.mytoolBar}>
                    <Typography variant="h6" className={classes.title}>
                        photoMe
                    </Typography>
                    <Button variant="text" color="primary" href="/">
                        Sign up
                    </Button>
                    <Button
                        variant="text"
                        color="primary"
                        href="/welcome#/login"
                    >
                        Log in
                    </Button>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </>
    );
};

export default NavBarReg;
