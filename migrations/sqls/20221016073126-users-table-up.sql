/* Replace with your SQL commands */

CREATE TABLE users (
  "id" SERIAL PRIMARY KEY, 
  "username" VARCHAR(50) NOT NULL,
  "firstName" VARCHAR(50) NOT NULL, 
  "lastName" VARCHAR(50) NOT NULL, 
  "password_digest" VARCHAR(256) NOT NULL
);