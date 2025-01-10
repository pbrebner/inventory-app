const pool = require("./pool");

// MOVIE QUERIES

async function selectMovies() {
    // Deconstruction to get the rows value from the query object (returns list of objects)
    const { rows } = await pool.query("SELECT * FROM movies");
    return rows;
}

async function insertMovie(title, yr_released) {
    await pool.query(
        "INSERT INTO movies (title, yr_released) VALUES ($1, $2)",
        [title, yr_released]
    );
}

async function selectMovie(movieId) {
    const { rows } = await pool.query("SELECT * FROM movies WHERE id = ($1)", [
        movieId,
    ]);
    return rows;
}

async function updateMovie(movieId, title, yr_released) {
    await pool.query(
        "UPDATE movies SET title = ($2), yr_released = ($3) WHERE id = ($1)",
        [movieId, title, yr_released]
    );
}

async function deleteMovie(movieId) {
    await pool.query("DELETE FROM movies WHERE id = ($1)", [movieId]);
}

// GENRE QUERIES

async function selectGenres() {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
}

async function insertGenre(genre) {
    await pool.query("INSERT INTO genres (genre) VALUES ($1)", [genre]);
}

async function selectGenre(genreId) {
    const { rows } = await pool.query("SELECT * FROM genres WHERE id = ($1)", [
        genreId,
    ]);
    return rows;
}

async function updateGenre(genreId, genre) {
    await pool.query("UPDATE genres SET genre = ($2) WHERE id = ($1)", [
        genreId,
        genre,
    ]);
}

async function deleteGenre(genreId) {
    await pool.query("DELETE FROM genres WHERE id = ($1)", [genreId]);
}

// DIRECTOR QUERIES

async function selectDirectors() {
    const { rows } = await pool.query("SELECT * FROM directors");
    return rows;
}

async function insertDirector(name) {
    await pool.query("INSERT INTO directors (name) VALUES ($1)", [name]);
}

async function selectDirector(directorId) {
    const { rows } = await pool.query(
        "SELECT * FROM directors WHERE id = ($1)",
        [directorId]
    );
    return rows;
}

async function updateDirector(directorId, name) {
    await pool.query("UPDATE directors SET name = ($2) WHERE id = ($1)", [
        directorId,
        name,
    ]);
}

async function deleteDirector(directorId) {
    await pool.query("DELETE FROM directors WHERE id = ($1)", [directorId]);
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
