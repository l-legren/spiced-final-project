DROP TABLE IF EXISTS friendship;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reset_codes;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    photographer BOOLEAN,
    model BOOLEAN,
    profile_pic VARCHAR(255),
    bio VARCHAR (255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE reset_codes (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE friendship (
    id SERIAL PRIMARY KEY,
    requester_id INT NOT NULL REFERENCES users(id),
    receiver_id INT NOT NULL REFERENCES users(id),
    friendship BOOLEAN DEFAULT false,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  message VARCHAR NOT NULL,
  user_id INT NOT NULL REFERENCES users(id),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX ON friendship (least(requester_id, receiver_id), greatest(requester_id, receiver_id));

-- INSERT INTO friendship (requester_id, receiver_id, friendship) VALUES (4, 9, true);
-- INSERT INTO friendship (requester_id, receiver_id, friendship) VALUES (7, 8, true);

-- INSERT INTO chat_messages (id, message, user_id) VALUES