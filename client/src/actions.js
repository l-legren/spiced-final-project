import instance from "./axios";

// GET USER INFO

export async function getUserInfo() {
    try {
        var { data } = await instance.get("/user");
        // console.log("DATA USER", data);
    } catch {
        (err) => console.log("Error fetching data", err);
    }

    return {
        type: "GET_USER_INFO",
        userInfo: data,
    };
}

// BIO

export function addBio(newBio) {
    return {
        type: "ADD_BIO",
        newBio: newBio,
    };
}

// MODAL PROFILE PIC

export function picModalVisible() {
    return {
        type: "PIC_MODAL_VISIBLE",
        modalVisible: true,
    };
}

export function picModalHidden() {
    return {
        type: "PIC_MODAL_HIDDEN",
        modalHidden: false,
    };
}

export function addProfilePicture(profilePic) {
    return {
        type: "UPDATE_PROFILE_PICTURE",
        profilePic: profilePic,
    };
}

// OTHER PROFILE

export function addOtherUserInfo(otherUserInfo) {
    return {
        type: "ADD_OTHER_USER_INFO",
        otherUserInfo: otherUserInfo,
    };
}

// IMAGEBOARD

export function imageboardModalVisible() {
    return {
        type: "IMAGEBOARD_MODAL_VISIBLE",
        modalVisible: true,
    };
}

export function imageboardModalHidden() {
    return {
        type: "IMAGEBOARD_MODAL_HIDDEN",
        modalHidden: false,
    };
}

export function addImageboardPicture(imageboardPic) {
    return {
        type: "ADD_IMAGEBOARD_PICTURE",
        imageboardPic: imageboardPic,
    };
}

export async function getUserImageboard() {
    try {
        var { data } = await instance.get("/get-user-imageboard");
    } catch {
        (err) => console.log("Error getting users imageboard", err);
    }
    return {
        type: "GET_USER_IMAGEBOARD",
        imageboardPics: data,
    };
}

export async function getOtherUserImageboard(id) {
    try {
        var { data } = await instance.get(`/get-others-imageboard/${id}`);
    } catch {
        (err) => console.log("Error getting others imageboard", err);
    }
    return {
        type: "GET_OTHER_USER_IMAGEBOARD",
        imageboardPics: data,
    };
}

// PRIVATE CHAT

export function modalFirstMessage(bool) {
    return {
        type: "FIRST_MESSAGE_ON",
        modalFirstMessage: bool,
    };
}

export async function getPmUsers() {
    try {
        var { data } = await instance.get("/get-private-messages");
        console.log("Data private", data);
    } catch {
        (err) => console.log("error fetching private messages", err);
    }

    return {
        type: "GET_PM_USERS",
        pmUsers: data,
    };
}

export async function getMessagesWithUser(user_id) {
    try {
        var { data } = await instance.get(`/msg-w-user/${user_id}`);
    } catch {
        (err) => console.log("Error getting messages with user", err);
    }

    return {
        type: "GET_MESSAGES_W_USER",
        messagesWithUser: data,
    };
}

// FIND USERS


// FRIENDS, REQUESTERS AND OPEN REQUESTS

// export async function getFriends(id) {
//     try {
//         var { data } = await instance.get(`/get-friends/${id}`);
//         console.log(`Getting friends of ${id} from server: `, data);
//     } catch {
//         (err) => console.log("Error fetching friends: ", err);
//     }

//     return {
//         type: "SHOW_FRIENDS",
//         friendsList: data,
//     };
// }

// export async function getRequesters(id) {
//     try {
//         var { data } = await instance.get(`/get-requesters/${id}`);
//         console.log(`Getting requesters of ${id} from server: `, data);
//     } catch {
//         (err) => console.log("Error fetching requesters: ", err);
//     }
//     return {
//         type: "SHOW_REQUESTERS",
//         requestersList: data.filter((req) => req.id == req.requester_id),
//         openRequests: data.filter((req) => req.id == req.receiver_id),
//     };
// }

// export async function acceptFriend(otherUserId) {
//     try {
//         await instance.post("/change-status", {
//             status: TEXT_BUTTON.ACCEPT_FRIENDSHIP,
//             otherUserId: otherUserId,
//         });
//         console.log("Friendship set to true in DB");
//     } catch {
//         (err) => console.log("Error accepting friend request", err);
//     }
//     return {
//         type: "ACCEPT_FRIENDSHIP",
//         acceptedId: otherUserId,
//     };
// }

// export async function removeFriend(otherUserId) {
//     try {
//         await instance.post("/change-status", {
//             status: TEXT_BUTTON.FRIENDS,
//             otherUserId: otherUserId,
//         });
//         console.log("Friendship removed from DB");
//     } catch {
//         console.log("Error removing friendship from DB");
//     }

//     return {
//         type: "REMOVE_FRIENDSHIP",
//         unfriendId: otherUserId,
//     };
// }

// const TEXT_BUTTON = {
//     NO_FRIENDS: "No friends",
//     FRIENDS: "Friends",
//     PENDING_REQUEST: "Pending request",
//     ACCEPT_FRIENDSHIP: "Accept request",
//     REJECT_FRIENDSHIP: "Ignore request",
// };

// // DISPATCH MESSAGES FROM CHAT

// export function storeChatMessages(mostRecentMessages) {
//     return {
//         type: "ADD_RECENT_MESSAGES",
//         recentMessages: mostRecentMessages,
//     };
// }

export function addNewPrivateMessage(newMessage) {
    return {
        type: "ADD_NEW_MESSAGE",
        newMessage: newMessage,
    };
}

// export function currentConnectedUsers(connectedUsers) {
//     return {
//         type: "CONNECTED_USERS",
//         connectedUsers: connectedUsers,
//     };
// }

// export function addConnectedUser(connectedUser) {
//     return {
//         type: "ADD_CONNECTED_USER",
//         connectedUser: connectedUser,
//     };
// }

// export function connectedUsersAfterUserLeaving(afterUserLeaving) {
//     return {
//         type: "USER_LEAVING",
//         afterUserLeaving: afterUserLeaving,
//     };
// }
