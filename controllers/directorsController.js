// controllers/directorsController.js

const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

// Get All Directors
async function getDirectors(req, res) {
    res.send("Not implemented yet");
}

// Create Director
async function createDirector(req, res) {
    res.send("Not implemented yet");
}

// Get Director
async function getDirector(req, res) {
    res.send("Not implemented yet");
}

// Update Director
async function updateDirector(req, res) {
    res.send("Not implemented yet");
}

// Delete Director
async function deleteDirector(req, res) {
    await db.deleteDirector();
    res.redirect("/");
}

module.exports = {
    getDirectors,
    createDirector,
    getDirector,
    updateDirector,
    deleteDirector,
};
