const pool = require("./pool");

// MOVIE QUERIES

async function selectMovies() {
    // Deconstruction to get the rows value from the query object (returns list of objects)
    const { rows } = await pool.query("SELECT * FROM movies");
    return rows;
}

async function insertMovie(title, yr_released, rating) {
    await pool.query(
        "INSERT INTO movies (title, yr_released, rating) VALUES ($1, $2, $3)",
        [title, yr_released, rating]
    );
}

async function selectMovie(movieId) {
    // Gets movie, including director name and director_id
    const { rows } = await pool.query(
        "SELECT movies.id, title, yr_released, rating, director_id, name FROM movies JOIN directors ON director_id = director.id WHERE movies.id = ($1)",
        [movieId]
    );
    return rows;
}

async function selectMovieGenre(movieId) {
    // Gets genre of specific movie
    const { rows } = await pool.query(
        "SELECT * FROM genres WHERE id IN (SELECT genre_id FROM movieGenres WHERE movie_id = ($1))",
        [movieId]
    );
    return rows;
}

async function updateMovie(movieId, title, yr_released, rating) {
    await pool.query(
        "UPDATE movies SET title = ($2), yr_released = ($3), rating = ($4) WHERE id = ($1)",
        [movieId, title, yr_released, rating]
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

async function selectGenreMovie(genreId) {
    // Gets all movies of specific genre
    const { rows } = await pool.query(
        "SELECT * FROM movies WHERE id IN (SELECT movie_id FROM movieGenres WHERE genre_id = ($1))",
        [genreId]
    );
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

async function selectDirectorMovie(directorId) {
    const { rows } = await pool.query(
        "SELECT movies.id, title, yr_released, rating, director_id, name FROM movies JOIN directors ON director_id = director.id WHERE diectors.id = ($1)",
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
    selectMovieGenre,
    updateMovie,
    deleteMovie,
    selectGenres,
    insertGenre,
    selectGenre,
    selectGenreMovie,
    updateGenre,
    deleteGenre,
    selectDirectors,
    insertDirector,
    selectDirector,
    selectDirectorMovie,
    updateDirector,
    deleteDirector,
};
