const pool = require("./pool");

// Movie Queries

async function selectMovies() {
    await pool.query("SELECT * FROM movies");
}

async function insertMovie(movie) {
    await pool.query("INSERT INTO movies (title) VALUES ($1)", [movie]);
}

async function selectMovie(movie) {
    await pool.query("SELECT * FROM movies WHERE title = ($1)", [movie]);
}

async function updateMovie(newMovie, oldMovie) {
    await pool.query("UPDATE movies SET title = ($1) WHERE title = ($2)", [
        newMovie,
        oldMovie,
    ]);
}

async function deleteMovie(movie) {
    await pool.query("DELETE FROM movies WHERE title = ($1)", [movie]);
}

// Genre Queries

async function selectGenres() {
    await pool.query("SELECT * FROM genres");
}

async function insertGenre(genre) {
    await pool.query("INSERT INTO genres (genre) VALUES ($1)", [genre]);
}

async function selectGenre(genre) {
    await pool.query("SELECT * FROM genres WHERE genre = ($1)", [genre]);
}

async function updateGenre(newGenre, oldGenre) {
    await pool.query("UPDATE genres SET genre = ($1) WHERE genre = ($2)", [
        newGenre,
        oldGenre,
    ]);
}

async function deleteGenre(genre) {
    await pool.query("DELETE FROM genres WHERE genre = ($1)", [genre]);
}

// Director Queries

async function selectDirectors() {
    await pool.query("SELECT * FROM directors");
}

async function insertDirector(director) {
    await pool.query("INSERT INTO directors (name) VALUES ($1)", [director]);
}

async function selectDirector(director) {
    await pool.query("SELECT * FROM directors WHERE name = ($1)", [director]);
}

async function updateDirector(newDirector, oldDirector) {
    await pool.query("UPDATE directors SET name = ($1) WHERE name = ($2)", [
        newDirector,
        oldDirector,
    ]);
}

async function deleteDirector(director) {
    await pool.query("DELETE FROM directors WHERE name = ($1)", [director]);
}

module.exports = {
    selectMovies,
    insertMovie,
    selectMovie,
    updateMovie,
    deleteMovie,
    selectGenres,
    insertGenre,
    selectGenre,
    updateGenre,
    deleteGenre,
    selectDirectors,
    insertDirector,
    selectDirector,
    updateDirector,
    deleteDirector,
};
