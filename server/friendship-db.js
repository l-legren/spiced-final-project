const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/photome"
);

module.exports.areFriends = (otherId, loggedId) => {
    const q = `SELECT * FROM friendship
    WHERE (receiver_id = $1 AND requester_id = $2)
    OR (receiver_id = $2 AND requester_id = $1)`;
    const params = [otherId, loggedId];

    return db.query(q, params);
};

module.exports.requestFriendship = (requester, receiver) => {
    const q = `INSERT INTO friendship(requester_id, receiver_id, friendship)
    VALUES ($1, $2, false) 
    RETURNING requester_id, receiver_id, friendship`;
    const params = [requester, receiver];

    return db.query(q, params);
};

module.exports.acceptRequest = (requester, receiver) => {
    const q = `UPDATE friendship
    SET friendship = true
    WHERE (requester_id = $1)
    AND (receiver_id = $2)`;
    const params = [requester, receiver];

    return db.query(q, params);
};

module.exports.unfriend = (requester, receiver) => {
    const q = `DELETE FROM friendship
    WHERE (requester_id = $1 AND receiver_id = $2)
    OR (receiver_id = $1 AND requester_id = $2)`;
    const params = [requester, receiver];

    return db.query(q, params);
};

module.exports.getFriends = (id) => {
    const q = `SELECT users.id, first, last, profile_pic
    FROM users
    JOIN friendship
    ON (friendship = true 
        AND 
        ((receiver_id = users.id AND requester_id = $1)
        OR 
        (receiver_id = $1 AND requester_id = users.id)
        ))`;
    const params = [id];

    return db.query(q, params);
};

module.exports.getRequesters = (id) => {
    const q = `SELECT users.id, requester_id, receiver_id, first, last, profile_pic
    FROM users
    JOIN friendship
    ON (friendship = false) 
        AND (
            (requester_id = users.id AND receiver_id = $1)
            OR
            (requester_id = $1 AND receiver_id = users.id)
            ) 
            `;

    const params = [id];

    return db.query(q, params);
};
