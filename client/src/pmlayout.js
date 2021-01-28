import {
    Box,
    makeStyles,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPmUsers, getMessagesWithUser, getUserInfo } from "./actions";
import { useEffect } from "react";
import ChatLayout from "./chatlayout";

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

const PrivateMessages = () => {
    const dispatch = useDispatch();
    const classes = useStyle();

    const pmUsers = useSelector((state) => (state && state.pmUsers) || []);
    var loggedUser = useSelector((state) => (state && state.userInfo) || {});

    function filterUsers(user) {
        return user.id != loggedUser.id;
    }

    const filtered = pmUsers.filter(filterUsers);

    const selectUser = (e) => {
        dispatch(getMessagesWithUser(e));
    };

    useEffect(() => {
        dispatch(getPmUsers());
        dispatch(getUserInfo());
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={5} md={4} lg={3}>
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
                                    <Divider variant="inset" component="li" />
                                </div>
                            );
                        })}
                    </List>
                </Grid>
                <Grid item xs={12} sm={7} md={8} lg={9}>
                    <ChatLayout />
                </Grid>
            </Grid>
        </div>
    );
};

export default PrivateMessages;