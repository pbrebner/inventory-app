#! /usr/bin/env node
require("dotenv").config();

// Run using: node db/populatedb.js
const { argv } = require("node:process");
let host = "localhost:5432";
if (argv[2]) {
    host = argv[2];
}

const { Client } = require("pg");

/*
const SQL = `
CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT
);

INSERT INTO movies (title) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');
`;
*/

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
