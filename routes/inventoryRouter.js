// routes/inventoryRouter.js
const { Router } = require("express");
const indexController = require("../controllers/indexController");
const moviesController = require("../controllers/moviesController");
const genresController = require("../controllers/genresController");
const directorsController = require("../controllers/directorsController");
const inventoryRouter = Router();

// Home Route

inventoryRouter.get("/", indexController.index);

// Movie Routes

inventoryRouter.get("/movies", moviesController.getMovies);

inventoryRouter.post("/movies", moviesController.createMovie);

inventoryRouter.get("/movies/:movieId", moviesController.getMovie);

inventoryRouter.get("/movies/:movieId/edit", moviesController.editMovie);

inventoryRouter.post("/movies/:movieId/update", moviesController.updateMovie);

inventoryRouter.post("/movies/:movieId/delete", moviesController.deleteMovie);

// Genre Routes

inventoryRouter.get("/genres", genresController.getGenres);

inventoryRouter.post("/genres", genresController.createGenre);

inventoryRouter.get("/genres/:genreId", genresController.getGenre);

inventoryRouter.get("/genres/:geneId/edit", genresController.editGenre);

inventoryRouter.post("/genres/:genreId/update", genresController.updateGenre);

inventoryRouter.post("/genres/:genreId/delete", genresController.deleteGenre);

// Director Routes

inventoryRouter.get("/directors", directorsController.getDirectors);

inventoryRouter.post("/directors", directorsController.createDirector);

inventoryRouter.get("/directors/:directorId", directorsController.getDirector);

inventoryRouter.get(
    "/directors/:directorId/edit",
    directorsController.editDirector
);

inventoryRouter.post(
    "/directors/:directorId/update",
    directorsController.updateDirector
);

inventoryRouter.post(
    "/directors/:directorId/delete",
    directorsController.deleteDirector
);

module.exports = inventoryRouter;
