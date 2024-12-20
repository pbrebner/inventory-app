// controllers/moviesController.js

const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

// Get All Movies
async function getMovies(req, res) {
    let movies = await db.selectMovies();
    res.render("movies", { title: "All Movies", movies: movies });
}

// Create Movie
// TODO: SANITIZE AND VALIDATE INPUTS
async function createMovie(req, res) {
    await db.insertMovie(req.body.title, req.body.year);
    res.redirect("/movies");
}

// Get Movie
async function getMovie(req, res) {
    let movie = await db.selectMovie(req.params.movieId);
    res.render("movie", { title: `${movie[0].title}`, movie: movie[0] });
}

// Edit Movie Page
async function editMovie(req, res) {
    let movie = await db.selectMovie(req.params.movieId);
    res.render("editMovie", { title: "Edit Movie", movie: movie[0] });
}

// Update Movie
// TODO: SANITIZE AND VALIDATE INPUTS
async function updateMovie(req, res) {
    await db.updateMovie(req.params.movieId, req.body.title, req.body.year);
    res.redirect("/movies");
}

// Delete Movie
async function deleteMovie(req, res) {
    await db.deleteMovie(req.params.movieId);
    res.redirect("/movies");
}

module.exports = {
    getMovies,
    createMovie,
    getMovie,
    editMovie,
    updateMovie,
    deleteMovie,
};
