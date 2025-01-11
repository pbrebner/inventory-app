// controllers/directorsController.js

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const validateDirector = [
    body("name")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("Director name must be between 1 and 100 characters")
        .escape(),
];

// Get All Directors
exports.getDirectors = asyncHandler(async (req, res, next) => {
    let directors = await db.selectDirectors();
    res.render("directors", {
        title: "All Directors",
        directors: directors,
        errors: [],
    });
});

// Create Director
exports.createDirector = [
    validateDirector,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Error Occured
            // Don't like having to query again
            let directors = await db.selectDirectors();
            res.render("directors", {
                title: "All Directors",
                directors: directors,
                directorEntry: {
                    name: req.body.name,
                },
                errors: errors.array(),
            });
        } else {
            await db.insertDirector(req.body.name);
            res.redirect("/directors");
        }
    }),
];

// Get Director
exports.getDirector = asyncHandler(async (req, res, next) => {
    let director = await db.selectDirector(req.params.directorId);
    res.render("director", {
        title: `${director[0].name}`,
        director: director[0],
    });
});

// Edit Director
exports.editDirector = asyncHandler(async (req, res, next) => {
    let director = await db.selectDirector(req.params.directorId);
    res.render("editDirector", {
        title: "Edit Director",
        director: director[0],
        errors: [],
    });
});

// Update Director
exports.updateDirector = [
    validateDirector,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("editDirector", {
                title: "Edit Director",
                director: { name: req.body.name },
                errors: errors.array(),
            });
        } else {
            await db.updateDirector(req.params.directorId, req.body.name);
            res.redirect("/directors");
        }
    }),
];

// Delete Director
exports.deleteDirector = asyncHandler(async (req, res, next) => {
    await db.deleteDirector(req.params.directorId);
    res.redirect("/directors");
});
