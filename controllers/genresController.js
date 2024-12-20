// controllers/genresController.js

const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

// Get All Genres
async function getGenres(req, res) {
    let genres = await db.selectGenres();
    res.render("genres", { title: "All Genres", genres: genres });
}

// Create Genre
// TODO: SANITIZE AND VALIDATE INPUTS
async function createGenre(req, res) {
    await db.insertGenre(req.body.genre);
    res.redirect("/genres");
}

// Get Genre
async function getGenre(req, res) {
    let genre = await db.selectGenre(req.params.genreId);
    res.send("Not implemented yet");
}

// Edit Genre
async function editGenre(req, res) {
    let genre = await db.selectGenre(req.params.genreId);
    res.send("Not implemented yet");
}

// Update Genre
// TODO: SANITIZE AND VALIDATE INPUTS
async function updateGenre(req, res) {
    await db.updateGenre(req.params.genreId, req.body.genre);
    res.redirect("/genres");
}

// Delete Genre
async function deleteGenre(req, res) {
    await db.deleteGenre(req.params.genreId);
    res.redirect("/genres");
}

module.exports = {
    getGenres,
    createGenre,
    getGenre,
    editGenre,
    updateGenre,
    deleteGenre,
};
