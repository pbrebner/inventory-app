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
CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT,
  yr_released INTEGER
);

INSERT INTO movies (title, yr_released) 
VALUES
  ('Movie 1', 1990),
  ('Movie 2', 2012),
  ('Movie 3', 2024);

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
