// controllers/genresController.js

const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

// Get All Genres
async function getGenres(req, res) {
    res.send("Not implemented yet");
}

// Create Genre
async function createGenre(req, res) {
    res.send("Not implemented yet");
}

// Get Genre
async function getGenre(req, res) {
    res.send("Not implemented yet");
}

// Update Genre
async function updateGenre(req, res) {
    res.send("Not implemented yet");
}

// Delete Genre
async function deleteGenre(req, res) {
    await db.deleteGenre();
    res.redirect("/");
}

module.exports = {
    getGenres,
    createGenre,
    getGenre,
    updateGenre,
    deleteGenre,
};
