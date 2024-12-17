// controllers/moviesController.js

const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

// Get All Movies
async function getMovies(req, res) {
    res.send("Not implemented yet");
}

// Create Movie
async function createMovie(req, res) {
    res.send("Not implemented yet");
}

// Get Movie
async function getMovie(req, res) {
    res.send("Not implemented yet");
}

// Update Movie
async function updateMovie(req, res) {
    res.send("Not implemented yet");
}

// Delete Movie
async function deleteMovie(req, res) {
    await db.deleteMovie();
    res.redirect("/");
}

module.exports = {
    getMovies,
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
};
