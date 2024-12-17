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

inventoryRouter.put("/movies/:movieId", moviesController.updateMovie);

inventoryRouter.delete("/movies/:movieId", moviesController.deleteMovie);

// Genre Routes

inventoryRouter.get("/genres", genresController.getGenres);

inventoryRouter.post("/genres", genresController.createGenre);

inventoryRouter.get("/genres/:genreId", genresController.getGenre);

inventoryRouter.put("/genres/:genreId", genresController.updateGenre);

inventoryRouter.delete("/genres/:genreId", genresController.deleteGenre);

// Director Routes

inventoryRouter.get("/directors", directorsController.getDirectors);

inventoryRouter.post("/directors", directorsController.createDirector);

inventoryRouter.get("/directors/:directorId", directorsController.getDirector);

inventoryRouter.put(
    "/directors/:directorId",
    directorsController.updateDirector
);

inventoryRouter.delete(
    "/directors/:directorId",
    directorsController.deleteDirector
);

module.exports = inventoryRouter;
