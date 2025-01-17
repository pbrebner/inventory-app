#! /usr/bin/env node
require("dotenv").config();

// Run using: node db/populatedb.js
const { argv } = require("node:process");
let host = "localhost:5432";
if (argv[2]) {
    host = argv[2];
}

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genre TEXT
);

INSERT INTO genres (genre) 
VALUES
  ('Action'),
  ('Adventure'),
  ('Sci-Fi');

CREATE TABLE IF NOT EXISTS directors (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT
);

INSERT INTO directors (name) 
VALUES
  ('Director 1'),
  ('Director 2'),
  ('Director 3');

CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT,
  yr_released INTEGER,
  rating INTEGER,
  director_id int REFERENCES directors ON DELETE SET NULL
);

INSERT INTO movies (title, yr_released, rating, director_id) VALUES
  ('Movie 1', 1990, 8, 1),
  ('Movie 2', 2012, 5, 2),
  ('Movie 3', 2024, 7, 3);

CREATE TABLE IF NOT EXISTS movieGenres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  movie_id int REFERENCES movies ON DELETE CASCADE,
  genre_id int REFERENCES genres ON DELETE CASCADE
);

INSERT INTO movieGenres (movie_id, genre_id) VALUES
  (1, 2),
  (1, 1),
  (2, 3),
  (3, 3);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.SQL_USER}:${process.env.SQL_PASSWORD}@${host}/${process.env.SQL_DATABASE}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
