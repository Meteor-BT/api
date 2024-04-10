CREATE KEYSPACE IF NOT EXISTS user_data
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE user_data;

CREATE TABLE IF NOT EXISTS waitlist (
    email text,
    date timestamp,
    PRIMARY KEY (email)
);
