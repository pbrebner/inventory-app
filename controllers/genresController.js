// controllers/genresController.js

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const validateGenre = [
    body("genre")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("Genre must be between 1 and 100 characters")
        .escape(),
];

// Get All Genres
exports.getGenres = asyncHandler(async (req, res, next) => {
    let genres = await db.selectGenres();
    res.render("genres", { title: "All Genres", genres: genres, errors: [] });
});

// Create Genre
exports.createGenre = [
    validateGenre,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Error Occured
            // Don't like having to query again
            let genres = await db.selectGenres();
            res.render("genres", {
                title: "All Genres",
                genres: genres,
                genreEntry: {
                    genre: req.body.genre,
                },
                errors: errors.array(),
            });
        } else {
            await db.insertGenre(req.body.genre);
            res.redirect("/genres");
        }
    }),
];

// Get Genre
exports.getGenre = asyncHandler(async (req, res, next) => {
    let genre = await db.selectGenre(req.params.genreId);
    res.render("genre", {
        title: `${movie[0].genre}`,
        genre: genre[0],
    });
});

// Edit Genre
exports.editGenre = asyncHandler(async (req, res, next) => {
    let genre = await db.selectGenre(req.params.genreId);
    res.render("editGenre", {
        title: "Edit Genre",
        genre: genre[0],
        errors: [],
    });
});

// Update Genre
exports.updateGenre = [
    validateGenre,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("editGenre", {
                title: "Edit Genre",
                genre: { genre: req.body.genre },
                errors: errors.array(),
            });
        } else {
            await db.updateGenre(req.params.genreId, req.body.genre);
            res.redirect("/genres");
        }
    }),
];

// Delete Genre
exports.deleteGenre = asyncHandler(async (req, res, next) => {
    await db.deleteGenre(req.params.genreId);
    res.redirect("/genres");
});
