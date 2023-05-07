CREATE TABLE assets (
id serial primary key,
category CHAR(20),
amount INT
);

CREATE TABLE users(
id serial primary key,
email varchar(255) unique,
password varchar(128)
);