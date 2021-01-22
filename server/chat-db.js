const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/photome"
);

module.exports.newMessage = (user_id, message) => {
    const q = `INSERT INTO chat_messages(user_id, message)
    VALUES ($1, $2)
    RETURNING user_id, message`;
    const params = [user_id, message];

    return db.query(q, params);
};

module.exports.getTenMostRecentMessages = () => {
    const q = `SELECT first, last, profile_pic, timestamp, message 
    FROM users
    LEFT OUTER JOIN chat_messages 
    ON (users.id = chat_messages.user_id)
    WHERE message IS NOT NULL 
    ORDER BY timestamp ASC
    LIMIT 10`;
    const params = [];

    return db.query(q, params);
};

module.exports.getUserWithMessage = (message) => {
    const q = `SELECT first, last, profile_pic, message, timestamp 
    FROM users
    LEFT OUTER JOIN chat_messages
    ON (users.id = chat_messages.user_id)
    WHERE message = ($1)
    ORDER BY timestamp DESC
    LIMIT 1`;
    const params = [message];

    return db.query(q, params);
};

module.exports.getUserInfo = (id) => {
    const q = `
    SELECT first, last, profile_pic
    FROM users
    WHERE id = ($1)`;
    const params = [id];

    return db.query(q, params);
};

module.exports.getConnectedUsers = (array) => {
    const q = `
    SELECT id, first, last, profile_pic
    FROM users
    WHERE id = ANY ($1)`;
    const params = [array];

    return db.query(q, params);
};
