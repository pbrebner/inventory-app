// controllers/moviesController.js

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const validateMovie = [
    body("title")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("Title must be between 1 and 100 characters")
        .escape(),
    body("year")
        .trim()
        .isNumeric()
        .withMessage("Must be numeric")
        .isLength({ min: 4, max: 4 })
        .withMessage("Must be valid 4 digit year")
        .escape(),
];

// Get All Movies
exports.getMovies = asyncHandler(async (req, res, next) => {
    let movies = await db.selectMovies();
    res.render("movies", { title: "All Movies", movies: movies });
});

// Create Movie
exports.createMovie = [
    validateMovie,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Error Occured
            // Don't like having to query all the movies again
            let movies = await db.selectMovies();
            res.render("movies", {
                title: "All Movies",
                movies: movies,
                movieEntry: {
                    title: req.body.title,
                    year: req.body.year,
                },
                errors: errors.array(),
            });
        } else {
            await db.insertMovie(req.body.title, req.body.year);
            res.redirect("/movies");
        }
    }),
];

// Get Movie
exports.getMovie = asyncHandler(async (req, res, next) => {
    let movie = await db.selectMovie(req.params.movieId);
    res.render("movie", {
        title: `${movie[0].title}`,
        movie: movie[0],
    });
});

// Edit Movie Page
exports.editMovie = asyncHandler(async (req, res, next) => {
    let movie = await db.selectMovie(req.params.movieId);
    res.render("editMovie", {
        title: "Edit Movie",
        movie: movie[0],
    });
});

// Update Movie
exports.updateMovie = [
    validateMovie,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("editMovie", {
                title: "Edit Movie",
                movie: { title: req.body.title, yr_released: req.body.year },
                errors: errors.array(),
            });
        } else {
            await db.updateMovie(
                req.params.movieId,
                req.body.title,
                req.body.year
            );
            res.redirect("/movies");
        }
    }),
];

// Delete Movie
exports.deleteMovie = asyncHandler(async (req, res, next) => {
    await db.deleteMovie(req.params.movieId);
    res.redirect("/movies");
});
