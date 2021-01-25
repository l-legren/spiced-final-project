const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/photome"
);

module.exports.newMessage = (emitter_id, receiver_id, message) => {
    const q = `INSERT INTO messages(emitter_id, receiver_id, message)
    VALUES ($1, $2, $3)
    RETURNING emitter_id, message`;
    const params = [emitter_id, receiver_id, message];

    return db.query(q, params);
};

// module.exports.getTenMostRecentMessages = () => {
//     const q = `SELECT first, last, profile_pic, timestamp, message
//     FROM users
//     LEFT OUTER JOIN messages
//     ON (users.id = messages.emitter_id)
//     WHERE message IS NOT NULL
//     ORDER BY timestamp ASC
//     LIMIT 10`;
//     const params = [];

//     return db.query(q, params);
// };

module.exports.getMessagesWithUser = (logged_user, third_user) => {
    const q = `SELECT users.id, first, last, profile_pic, message, timestamp 
    FROM users
    LEFT OUTER JOIN messages
    ON (users.id = messages.emitter_id)
    WHERE (emitter_id = ($1) AND receiver_id = $2)
    OR (emitter_id = ($2) AND receiver_id = $1)
    ORDER BY timestamp ASC`;

    const params = [logged_user, third_user];
    return db.query(q, params);
};

module.exports.getUsersWithMessages = (id) => {
    const q = `
    SELECT DISTINCT users.id, first, last, profile_pic
    FROM users 
    LEFT OUTER JOIN messages
    ON (users.id = emitter_id)
    WHERE emitter_id = ($1)
    OR receiver_id = ($1)`;
    const params = [id];

    return db.query(q, params);
};

// module.exports.getConnectedUsers = (array) => {
//     const q = `
//     SELECT id, first, last, profile_pic
//     FROM users
//     WHERE id = ANY ($1)`;
//     const params = [array];

//     return db.query(q, params);
// };
