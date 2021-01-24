const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/photome"
);

// INSERTING QUERIES

module.exports.addUser = (first, last, email, password) => {
    const q = `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id, first, last, email`;
    const params = [first, last, email, password];

    return db.query(q, params);
};

module.exports.newCode = (code, email) => {
    const q = `INSERT INTO reset_codes (code, email)
    VALUES ($1, $2)`;
    const params = [code, email];

    return db.query(q, params);
};

// FETCHING DATA FROM DATABASE

module.exports.getPassword = (email) => {
    const q = `SELECT password, id FROM users
    WHERE email=($1)`;
    const params = [email];

    return db.query(q, params);
};

module.exports.mailExists = (email) => {
    const q = `SELECT * FROM users WHERE email=($1)`;
    const params = [email];

    return db.query(q, params);
};

module.exports.getCode = (email) => {
    const q = `SELECT * FROM reset_codes
    WHERE email = ($1) 
    AND CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'`;
    const params = [email];

    return db.query(q, params);
};

module.exports.getUser = (id) => {
    const q = `SELECT * FROM users
    WHERE id = ($1)`;
    const params = [id];

    return db.query(q, params);
};

module.exports.threeMostRecent = () => {
    const q = `
    SELECT * FROM users ORDER BY id DESC LIMIT 3`;

    return db.query(q);
};

module.exports.matchUsers = (val) => {
    const q = `SELECT * FROM users
    WHERE first ILIKE $1`;
    const params = [val + "%"];

    return db.query(q, params);
};

// UPDATING

module.exports.updatePassword = (email, password) => {
    const q = `UPDATE users
    SET password = ($2)
    WHERE email = ($1)`;
    const params = [email, password];

    return db.query(q, params);
};

module.exports.updateProfilePic = (profile_pic, id) => {
    const q = `UPDATE users
    SET profile_pic = ($1)
    WHERE id=($2)
    RETURNING profile_pic`;
    const params = [profile_pic, id];

    return db.query(q, params);
};

module.exports.updateBio = (bio, id) => {
    const q = `UPDATE users
    SET bio = ($1)
    WHERE id = ($2)
    RETURNING bio`;
    const params = [bio, id];

    return db.query(q, params);
};

module.exports.addImageboardPic = (userId, url) => {
    const q = `INSERT INTO imageboard (user_id, url)
    VALUES ($1, $2)
    RETURNING user_id, url, timestamp`;
    const params = [userId, url];

    return db.query(q, params);
};

module.exports.getUserImageboard = (id) => {
    const q = `SELECT * FROM imageboard
    WHERE user_id = $1
    ORDER BY timestamp ASC`;
    const params = [id];

    return db.query(q, params);
};
