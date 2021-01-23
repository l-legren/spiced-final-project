export default function reducer(state = {}, action) {
    if (action.type == "ADD_USER_INFO") {
        state = {
            ...state,
            userInfo: action.userInfo,
        };
    }

    if (action.type == "GET_USER_INFO") {
        state = {
            ...state,
            userInfo: Object.keys(action.userInfo)
                .filter((key) =>
                    ["id", "first", "last", "profile_pic", "bio"].includes(key)
                )
                .reduce((obj, key) => {
                    obj[key] = action.userInfo[key];
                    return obj;
                }, {}),
        };
    }

    if (action.type == "ADD_BIO") {
        state = {
            ...state,
            userInfo: { ...state.userInfo, bio: action.newBio },
        };
    }

    if (action.type == "PIC_MODAL_VISIBLE") {
        state = {
            ...state,
            picModal: action.modalVisible,
        };
    }

    if (action.type == "PIC_MODAL_HIDDEN") {
        state = {
            ...state,
            picModal: action.modalHidden,
        };
    }

    // if (action.type == "SHOW_FRIENDS") {
    //     state = {
    //         ...state,
    //         friends: action.friendsList,
    //     };
    // }

    // if (action.type == "SHOW_REQUESTERS") {
    //     state = {
    //         ...state,
    //         requestsToUser: action.requestersList,
    //         requestsFromUser: action.openRequests,
    //     };
    // }

    // if (action.type == "ACCEPT_FRIENDSHIP") {
    //     state = {
    //         ...state,
    //         requestsToUser: state.requestsToUser.filter(
    //             (user) => user.id != action.acceptedId
    //         ),
    //         friends: [
    //             ...state.friends,
    //             state.requestsToUser.find(
    //                 (user) => user.id == action.acceptedId
    //             ),
    //         ],
    //     };
    // }

    // if (action.type == "REMOVE_FRIENDSHIP") {
    //     state = {
    //         ...state,
    //         friends: state.friends.filter(
    //             (user) => user.id != action.unfriendId
    //         ),
    //         requestsFromUser: state.requestsFromUser.filter(
    //             (user) => user.id != action.unfriendId
    //         ),
    //     };
    // }

    // if (action.type == "ADD_RECENT_MESSAGES") {
    //     state = {
    //         ...state,
    //         recentMessages: action.recentMessages,
    //     };
    // }

    // if (action.type == "ADD_NEW_MESSAGE") {
    //     state = {
    //         ...state,
    //         recentMessages: [...state.recentMessages, action.newMessage],
    //     };
    // }

    // if (action.type == "CONNECTED_USERS") {
    //     state = {
    //         ...state,
    //         usersConnected: action.connectedUsers,
    //     };
    // }

    // if (action.type == "ADD_CONNECTED_USER") {
    //     state = {
    //         ...state,
    //         usersConnected: [...state.usersConnected, action.connectedUser],
    //     };
    // }

    // if (action.type == "USER_LEAVING") {
    //     state = {
    //         ...state,
    //         usersConnected: action.afterUserLeaving,
    //     };
    // }

    console.log("Redux state", state);
    return state;
}
