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
                    [
                        "id",
                        "first",
                        "last",
                        "profile_pic",
                        "bio",
                        "model",
                        "photographer",
                        "city",
                    ].includes(key)
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

    if (action.type == "UPDATE_PROFILE_PICTURE") {
        state = {
            ...state,
            userInfo: { ...state.userInfo, profile_pic: action.profilePic },
        };
    }

    if (action.type == "ADD_OTHER_USER_INFO") {
        state = {
            ...state,
            // don't want to pass the pwd, filtering it in these lines below
            otherUserInfo: Object.keys(action.otherUserInfo)
                .filter((key) =>
                    ["id", "first", "last", "profile_pic", "bio"].includes(key)
                )
                .reduce((obj, key) => {
                    obj[key] = action.otherUserInfo[key];
                    return obj;
                }, {}),
        };
    }

    // IMAGEBOARD

    if (action.type == "IMAGEBOARD_MODAL_VISIBLE") {
        state = {
            ...state,
            imageboardModal: action.modalVisible,
        };
    }

    if (action.type == "IMAGEBOARD_MODAL_HIDDEN") {
        state = {
            ...state,
            imageboardModal: action.modalVisible,
        };
    }

    if (action.type == "GET_USER_IMAGEBOARD") {
        state = {
            ...state,
            imageboardPicsUser: action.imageboardPics,
        };
    }

    if (action.type == "ADD_IMAGEBOARD_PICTURE") {
        state = {
            ...state,
            imageboardPicsUser: [
                ...state.imageboardPicsUser,
                action.imageboardPic,
            ],
        };
    }

    if (action.type == "GET_OTHER_USER_IMAGEBOARD") {
        state = {
            ...state,
            imageboardPicsOtherUser: action.imageboardPics,
        };
    }

    // CHAT MESSAGING

    if (action.type == "FIRST_MESSAGE_ON") {
        state = {
            ...state,
            modalFirstMessage: action.modalFirstMessage,
        };
    }

    // if (action.type == "ADD_FIRST_MESSAGE") {
    //     state = {
    //         ...state,
    //         firstMessage: action.message,
    //     };
    // }

    if (action.type == "GET_PM_USERS") {
        state = {
            ...state,
            pmUsers: action.pmUsers,
        };
    }

    if (action.type == "GET_MESSAGES_W_USER") {
        state = {
            ...state,
            messagesWithUser: action.messagesWithUser,
        };
    }

    if (action.type == "VALUE_SEARCH") {
        state = {
            ...state,
            valueSearch: action.valueSearch,
        };
    }

    if (action.type == "USERS_IN_CITY") {
        state = {
            ...state,
            usersInCity: action.usersInCity,
        };
    }

    // if (action.type == "ADD_RECENT_MESSAGES") {
    //     state = {
    //         ...state,
    //         recentMessages: action.recentMessages,
    //     };
    // }

    if (action.type == "ADD_NEW_MESSAGE") {
        state = {
            ...state,
            messagesWithUser: [...state.messagesWithUser, action.newMessage],
        };
    }

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
