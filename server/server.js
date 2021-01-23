const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
process.env.NODE_ENV === "production"
    ? (secrets = process.env)
    : (secrets = require("./secrets"));
const cookieSession = require("cookie-session");
const db = require("./db.js");
const dbf = require("./friendship-db");
const dbc = require("./chat-db");
// csurf create tokens in the requests objects!!
const csurf = require("csurf");
const { hash, compare } = require("./bc.js");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const multer = require("multer");
const uidSafe = require("uid-safe");
const { upload } = require("./s3.js");
const { s3Url } = require("./config.json");

// MIDDLEWARE

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, `${uid}${path.extname(file.originalname)}`);
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.use(express.json());

const cookieSessionMiddleware = cookieSession({
    secret: "I am an hungry man",
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

app.use(cookieSessionMiddleware);

io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(express.urlencoded({ extended: false }));

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

// ROUTES!

app.get("/", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", (req, res) => {
    console.log(req.body);
    const { first, last, email, password } = req.body;
    hash(password)
        .then((hash) => {
            console.log(hash);
            return db
                .addUser(first, last, email, hash)
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    console.log(rows);
                    res.json(rows[0]);
                    console.log("req.session set");
                })
                .catch((err) => {
                    console.log("Error adding to database: ", err);
                    res.json({
                        success: false,
                    });
                });
        })
        .catch((err) =>
            console.log("Error hashing the password for database: ", err)
        );
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.getPassword(email).then(({ rows }) => {
        const hashedPsw = rows[0].password;
        compare(password, hashedPsw)
            .then((booleanResult) => {
                if (booleanResult) {
                    req.session.userId = rows[0].id;
                    res.json({
                        success: true,
                    });
                }
            })
            .catch((err) => {
                console.log("Error logging: ", err);
                res.json({
                    success: false,
                });
            });
    });
});

app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;
    db.mailExists(email)
        .then(({ rows }) => {
            if (rows.length == 1) {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                db.newCode(secretCode, rows[0].email)
                    .then(() => {
                        // console.log("Code stored in Table");
                        sendEmail(
                            "carlosleret@gmail.com",
                            `Hey ${rows[0].first} ${rows[0].last}, here is your code! ${secretCode}`,
                            "Your new Code!"
                        )
                            .then(() => {
                                console.log("Mail sent!");
                                res.json({
                                    success: true,
                                });
                            })
                            .catch((err) => {
                                console.log("Error sending the eMail:", err);
                                res.json({
                                    success: false,
                                });
                            });
                    })
                    .catch((err) => console.log("Error storing Code: ", err));
            }
        })
        .catch((err) => {
            console.log("Error getting provided eMail: ", err);
            res.json({
                success: false,
            });
        });
});

app.post("/password/reset/confirm", (req, res) => {
    const { email, code, newPassword } = req.body;
    db.getCode(email)
        .then(({ rows }) => {
            console.log("From Query:", rows);
            const storedCode = rows[0].code;
            if (storedCode == code) {
                hash(newPassword).then((hashedNew) => {
                    console.log(hashedNew);
                    db.updatePassword(email, hashedNew)
                        .then(() => {
                            console.log("DB updated!");
                            res.json({
                                success: true,
                            });
                        })
                        .catch((err) => {
                            console.log("Error while updating DB: ", err);
                            res.json({
                                success: false,
                            });
                        });
                });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("Error matching codes", err);
            res.json({
                success: false,
            });
        });
});

app.get("/user", (req, res) => {
    db.getUser(req.session.userId)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("Error requesting data from server: ", err);
            res.json({
                success: false,
            });
        });
});

// app.post("/upload-picture", uploader.single("picture"), upload, (req, res) => {
//     const { filename } = req.file;
//     const fullUrl = `${s3Url}${filename}`;
//     db.updateProfilePic(fullUrl, req.session.userId)
//         .then(({ rows }) => {
//             console.log(
//                 "Pic stored in database and returned:",
//                 rows[0].profile_pic
//             );
//             const profile_pic = rows[0].profile_pic;
//             res.json({
//                 pic: profile_pic,
//             });
//         })
//         .catch((err) => {
//             console.log("Error storing pic on db:", err);
//             res.json({
//                 success: false,
//             });
//         });
// });

app.post("/update-bio", (req, res) => {
    const { bio } = req.body;
    db.updateBio(bio, req.session.userId)
        .then(({ rows }) => {
            console.log("Data stored in db: ", rows);
            res.json(rows);
        })
        .catch((err) => console.log("Error storing bio", err));
});

// app.get("/user-info/:id", (req, res) => {
//     const { id } = req.params;
//     db.getUser(id).then(({ rows }) => {
//         if (rows[0] == undefined) {
//             res.json({
//                 success: false,
//             });
//         } else {
//             res.json({
//                 data: rows[0],
//                 loggedId: req.session.userId,
//             });
//         }
//     });
// });

// app.get("/log-out", (req, res) => {
//     req.session.userId = null;
//     console.log(req.session.userId);
//     res.json({
//         success: true,
//     });
// });

// app.get("/get-most-recent-users", (req, res) => {
//     console.log("request done");
//     db.threeMostRecent()
//         .then(({ rows }) => {
//             console.log("3 most recent users: ", rows);
//             res.json(rows);
//         })
//         .catch((err) => {
//             console.log("Error in db query: ".err);
//             res.json({
//                 success: false,
//             });
//         });
// });

// app.get("/users-match/:match", (req, res) => {
//     const { match } = req.params;
//     console.log(match);
//     db.matchUsers(match)
//         .then(({ rows }) => {
//             console.log("Matched Users: ", rows);
//             res.json(rows);
//         })
//         .catch((err) => {
//             console.log("Error in db request: ", err);
//             res.json({
//                 success: false,
//             });
//         });
// });

// app.get("/friend-request/:other", (req, res) => {
//     const { other } = req.params;
//     dbf.areFriends(other, req.session.userId)
//         .then(({ rows }) => {
//             res.json(rows);
//         })
//         .catch((err) => console.log("Error fetching from db: ", err));
// });

// app.post("/change-status", (req, res) => {
//     console.log(req.body);
//     const { otherUserId, status } = req.body;

//     if (
//         status == TEXT_BUTTON.FRIENDS ||
//         status == TEXT_BUTTON.PENDING_REQUEST
//     ) {
//         dbf.unfriend(req.session.userId, otherUserId)
//             .then(() => {
//                 console.log("Removed from friends");
//                 res.json({
//                     status: TEXT_BUTTON.NO_FRIENDS,
//                 });
//             })
//             .catch((err) => console.log("Error removing from DB: ", err));
//     } else if (status == TEXT_BUTTON.NO_FRIENDS) {
//         dbf.requestFriendship(req.session.userId, otherUserId)
//             .then(() => {
//                 console.log("Friend request sent!");
//                 res.json({
//                     status: TEXT_BUTTON.PENDING_REQUEST,
//                 });
//             })
//             .catch((err) =>
//                 console.log("Error requesting friendship in DB: ", err)
//             );
//     } else if (status == TEXT_BUTTON.ACCEPT_FRIENDSHIP) {
//         dbf.acceptRequest(otherUserId, req.session.userId)
//             .then(() => {
//                 console.log("Friendship request accepted");
//                 res.json({
//                     status: TEXT_BUTTON.FRIENDS,
//                 });
//             })
//             .catch((err) =>
//                 console.log("Error accepting friendship in DB: ", err)
//             );
//     }
// });

// app.post("/reject-request", (req, res) => {
//     const { reject, otherUserId } = req.body;
//     if (reject) {
//         dbf.unfriend(req.session.userId, otherUserId)
//             .then(() => {
//                 console.log("Removed from Database");
//                 res.json({
//                     success: true,
//                 });
//             })
//             .catch((err) => console.log("Error removing from Database: ", err));
//     }
// });

// app.get("/get-friends/:id", (req, res) => {
//     const { id } = req.params;
//     dbf.getFriends(id).then(({ rows }) => {
//         // console.log("THESE ARE FRIENDS: ", rows);
//         res.json(rows);
//     });
// });

// app.get("/get-requesters/:id", (req, res) => {
//     console.log("working on the server: ", req.params);
//     const { id } = req.params;
//     dbf.getRequesters(id).then(({ rows }) => {
//         console.log("THESE ARE THE REQUESTERS: ", rows);
//         res.json(rows);
//     });
// });

// let onlineUsers = {};

// io.on("connection", (socket) => {
//     const userId = socket.request.session.userId;

//     if (!userId) {
//         return socket.disconnect(true);
//     }

//     onlineUsers[socket.id] = userId;

//     dbc.getUserInfo(userId).then(({ rows }) => {
//         console.log("This is user connecting", rows[0]);
//         socket.broadcast.emit("adding connected user", rows[0]);
//     });
//     let arrOfIds = [...new Set(Object.values(onlineUsers))];
//     dbc.getConnectedUsers(arrOfIds)
//         .then(({ rows }) => {
//             socket.emit("connected users", rows);
//         })
//         .catch((err) => console.log("Error getting connected users", err));
//     // Display most recent messages
//     dbc.getTenMostRecentMessages().then(({ rows }) => {
//         socket.emit("most recent messages", rows);
//     });
//     // Add a new message to the chatroom
//     socket.on("new chat message", (message) => {
//         dbc.newMessage(userId, message)
//             .then(({ rows }) => {
//                 dbc.getUserWithMessage(rows[0].message).then(({ rows }) => {
//                     console.log("These are fields after double query", rows[0]);
//                     io.sockets.emit("new message and user", rows[0]);
//                 });
//             })
//             .catch((err) =>
//                 console.log("Error while getting message user info", err)
//             );
//     });
//     // DISCONNECT FROM usersConnected
//     socket.on("disconnect", () => {
//         console.log("Array before deleting", arrOfIds);
//         while (onlineUsers[socket.id]) {
//             delete onlineUsers[socket.id];
//         }
//         arrOfIds = [...new Set(Object.values(onlineUsers))];
//         console.log("Array after deleting", arrOfIds);
//         dbc.getConnectedUsers(arrOfIds)
//             .then(({ rows }) => {
//                 socket.broadcast.emit("user disconnected", rows);
//             })
//             .catch((err) => console.log("Error deleting user", err));
//     });
// });

// NEVER COMMENT OUT THIS LINE OF CODE!!!
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

const TEXT_BUTTON = {
    NO_FRIENDS: "No friends",
    FRIENDS: "Friends",
    PENDING_REQUEST: "Pending request",
    ACCEPT_FRIENDSHIP: "Accept request",
    REJECT_FRIENDSHIP: "Ignore request",
};

// IN THE BEGINNING ONLY THIS!

// const express = require("express");
// const app = express();
// const compression = require("compression");
// const path = require("path");

// app.use(compression());

// app.use(express.static(path.join(__dirname, "..", "client", "public")));

// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "..", "client", "index.html"));
// });

// app.listen(process.env.PORT || 3001, function () {
//     console.log("I'm listening.");
// });
