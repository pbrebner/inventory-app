// controllers/directorsController.js

const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

// Get All Directors
async function getDirectors(req, res) {
    let directors = await db.selectDirectors();
    res.render("directors", { title: "All Directors", directors: directors });
}

// Create Director
async function createDirector(req, res) {
    await db.insertDirector(req.body.name);
    res.redirect("/directors");
}

// Get Director
async function getDirector(req, res) {
    let director = await db.selectDirector(req.params.directorId);
    res.send("Not implemented yet");
}

// Edit Director
async function editDirector(req, res) {
    let director = await db.selectDirector(req.params.directorId);
    res.send("Not implemented yet");
}

// Update Director
async function updateDirector(req, res) {
    await db.updateDirector(req.params.directorId, req.body.name);
    res.redirect("/directors");
}

// Delete Director
async function deleteDirector(req, res) {
    await db.deleteDirector(req.params.directorId);
    res.redirect("/directors");
}

module.exports = {
    getDirectors,
    createDirector,
    getDirector,
    editDirector,
    updateDirector,
    deleteDirector,
};
