// controllers/moviesController.js

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const validateMovie = [
    body("title")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("Title must be between 1 and 100 characters.")
        .escape(),
    body("year")
        .trim()
        .isNumeric({ min: 1900, max: 2025 })
        .withMessage("Year must be between 1900 and 2025.")
        .escape(),
    body("rating")
        .trim()
        .isNumeric({ min: 0, max: 10 })
        .withMessage("Rating must be number between 0 and 10.")
        .escape(),
    body("director")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("Director name must be between 1 and 100 characters")
        .optional()
        .escape(),
];

// Get All Movies
exports.getMovies = asyncHandler(async (req, res, next) => {
    let movies = await db.selectMovies();
    let genres = await db.selectGenres();
    res.render("movies", {
        title: "All Movies",
        movies: movies,
        genres: genres,
        errors: [],
    });
});

// Create Movie
exports.createMovie = [
    validateMovie,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        let selectedGenres = req.body.genres;

        if (!errors.isEmpty()) {
            // Error Occured
            // Don't like having to query all the movies again
            let movies = await db.selectMovies();
            let genres = await db.selectGenres();

            // labels genres as selected or not
            genres.forEach((genre) => {
                if (Array.isArray(selectedGenres)) {
                    if (selectedGenres.some((entry) => entry === genre.genre)) {
                        genre.selected = true;
                    } else {
                        genre.selcted = false;
                    }
                } else {
                    if (genre.genre == selectedGenres) {
                        genre.selected = true;
                    } else {
                        genre.selcted = false;
                    }
                }
            });

            res.render("movies", {
                title: "All Movies",
                movies: movies,
                genres: genres,
                movieEntry: {
                    title: req.body.title,
                    year: req.body.year,
                    rating: req.body.rating,
                    director: req.body.director || "",
                },
                errors: errors.array(),
            });
        } else {
            // Handle creating movie and/or director
            let director = await db.selectDirectorByName(req.body.director);
            let movieId = "";

            if (director.length != 0) {
                // Director already exists in Inventory
                let newMovie = await db.insertMovie(
                    req.body.title,
                    req.body.year,
                    req.body.rating,
                    director[0].id
                );
                movieId = newMovie[0].id;
            } else {
                // Director did not already exist
                let newDirector = await db.insertDirector(req.body.director);
                let newMovie = await db.insertMovie(
                    req.body.title,
                    req.body.year,
                    req.body.rating,
                    newDirector[0].id
                );
                movieId = newMovie[0].id;
            }

            // Handle genre for each provided
            if (Array.isArray(selectedGenres)) {
                selectedGenres.forEach(async (selectedGenre) => {
                    let genre = await db.selectGenreByGenre(selectedGenre);
                    await db.insertMovieGenre(movieId, genre[0].id);
                });
            } else {
                let genre = await db.selectGenreByGenre(selectedGenres);
                await db.insertMovieGenre(movieId, genre[0].id);
            }

            res.redirect("/movies");
        }
    }),
];

// Get Movie
exports.getMovie = asyncHandler(async (req, res, next) => {
    let movie = await db.selectMovie(req.params.movieId);
    let genres = await db.selectMovieGenre(req.params.movieId);
    res.render("movie", {
        title: `${movie[0].title}`,
        movie: movie[0],
        genres: genres,
    });
});

// Edit Movie Page
exports.editMovie = asyncHandler(async (req, res, next) => {
    let movie = await db.selectMovie(req.params.movieId);
    let movieGenres = await db.selectMovieGenre(req.params.movieId);
    let genres = await db.selectGenres();

    // Labels genres selected or not
    genres.forEach((genre) => {
        if (movieGenres.some((obj) => obj.id === genre.id)) {
            genre.selected = true;
        } else {
            genre.selcted = false;
        }
    });

    res.render("editMovie", {
        title: "Edit Movie",
        movie: movie[0],
        genres: genres,
        errors: [],
    });
});

// Update Movie
exports.updateMovie = [
    validateMovie,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        let selectedGenres = req.body.genres;

        if (!errors.isEmpty()) {
            let genres = await db.selectGenres();

            // Labels genres selected or not
            genres.forEach((genre) => {
                if (Array.isArray(selectedGenres)) {
                    if (selectedGenres.some((entry) => entry === genre.genre)) {
                        genre.selected = true;
                    } else {
                        genre.selcted = false;
                    }
                } else {
                    if (genre.genre == selectedGenres) {
                        genre.selected = true;
                    } else {
                        genre.selcted = false;
                    }
                }
            });

            res.render("editMovie", {
                title: "Edit Movie",
                movie: {
                    title: req.body.title,
                    yr_released: req.body.year,
                    rating: req.body.rating,
                    director: req.body.director,
                },
                genres: genres,
                errors: errors.array(),
            });
        } else {
            // Handle creating movie and/or director
            let director = await db.selectDirectorByName(req.body.director);
            let movieId = req.params.movieId;

            if (director.length != 0) {
                // Director already existed in inventory
                await db.updateMovie(
                    movieId,
                    req.body.title,
                    req.body.year,
                    req.body.rating,
                    director[0].id
                );
            } else {
                let newDirector = await db.insertDirector(req.body.director);
                await db.updateMovie(
                    movieId,
                    req.body.title,
                    req.body.year,
                    req.body.rating,
                    newDirector[0].id
                );
            }

            // Delete all previous moviegenres
            await db.deleteMovieGenre(movieId);

            // Handle genre for each provided
            if (Array.isArray(selectedGenres)) {
                selectedGenres.forEach(async (selectedGenre) => {
                    let genre = await db.selectGenreByGenre(selectedGenre);
                    await db.insertMovieGenre(movieId, genre[0].id);
                });
            } else {
                let genre = await db.selectGenreByGenre(selectedGenres);
                await db.insertMovieGenre(movieId, genre[0].id);
            }

            res.redirect("/movies");
        }
    }),
];

// Delete Movie
exports.deleteMovie = asyncHandler(async (req, res, next) => {
    //await db.deleteMovieGenre(req.params.movieId);
    await db.deleteMovie(req.params.movieId);

    res.redirect("/movies");
});
