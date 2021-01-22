import io from "socket.io-client";
import {
    storeChatMessages,
    addNewMessage,
    currentConnectedUsers,
    addConnectedUser,
    connectedUsersAfterUserLeaving
} from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }

    // socket.on("most recent messages", (mostRecentMessages) => {
    //     store.dispatch(storeChatMessages(mostRecentMessages));
    // });

    // socket.on("new message and user", (userAndMessage) => {
    //     console.log("Got this from sockets:", userAndMessage);
    //     store.dispatch(addNewMessage(userAndMessage));
    // });

    // socket.on("connected users", (connectedUsers) => {
    //     console.log("These are the connected users: ", connectedUsers);
    //     store.dispatch(currentConnectedUsers(connectedUsers));
    // });

    // socket.on("adding connected user", (connectedUser) => {
    //     console.log("this user just connected", connectedUser);
    //     store.dispatch(addConnectedUser(connectedUser));
    // });

    // socket.on("user disconnected", (afterUserLeaving) => {
    //     console.log("After user is leaving: ", afterUserLeaving);
    //     store.dispatch(connectedUsersAfterUserLeaving(afterUserLeaving));
    // });
};
