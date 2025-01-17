const pool = require("./pool");

// MOVIE QUERIES

async function selectMovies() {
    // Deconstruction to get the rows value from the query object (returns list of objects)
    const { rows } = await pool.query("SELECT * FROM movies");
    return rows;
}

async function insertMovie(title, yr_released, rating, director_id) {
    const { rows } = await pool.query(
        "INSERT INTO movies (title, yr_released, rating, director_id) VALUES ($1, $2, $3, $4) RETURNING id",
        [title, yr_released, rating, director_id]
    );
    return rows;
}

async function selectMovie(movieId) {
    // Gets movie, including director name and director_id
    const { rows } = await pool.query(
        "SELECT movies.id, title, yr_released, rating, director_id, name AS director FROM movies JOIN directors ON director_id = directors.id WHERE movies.id = ($1)",
        [movieId]
    );
    return rows;
}

async function updateMovie(movieId, title, yr_released, rating, directorId) {
    const { rows } = await pool.query(
        "UPDATE movies SET title = ($2), yr_released = ($3), rating = ($4), director_id = ($5) WHERE id = ($1) RETURNING id",
        [movieId, title, yr_released, rating, directorId]
    );
    return rows;
}

async function deleteMovie(movieId) {
    const { rows } = await pool.query(
        "DELETE FROM movies WHERE id = ($1) RETURNING id",
        [movieId]
    );
    return rows;
}

// GENRE QUERIES

async function selectGenres() {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
}

async function insertGenre(genre) {
    const { rows } = await pool.query(
        "INSERT INTO genres (genre) VALUES ($1) RETURNING id",
        [genre]
    );
    return rows;
}

async function selectGenre(genreId) {
    const { rows } = await pool.query("SELECT * FROM genres WHERE id = ($1)", [
        genreId,
    ]);
    return rows;
}

async function selectGenreByGenre(genre) {
    const { rows } = await pool.query(
        "SELECT * FROM genres WHERE genre = ($1)",
        [genre]
    );
    return rows;
}

async function updateGenre(genreId, genre) {
    const { rows } = await pool.query(
        "UPDATE genres SET genre = ($2) WHERE id = ($1) RETURNING id",
        [genreId, genre]
    );
    return rows;
}

async function deleteGenre(genreId) {
    const { rows } = await pool.query(
        "DELETE FROM genres WHERE id = ($1) RETURNING id",
        [genreId]
    );
    return rows;
}

// DIRECTOR QUERIES

async function selectDirectors() {
    const { rows } = await pool.query("SELECT * FROM directors");
    return rows;
}

async function insertDirector(name) {
    const { rows } = await pool.query(
        "INSERT INTO directors (name) VALUES ($1) RETURNING id",
        [name]
    );
    return rows;
}

async function selectDirector(directorId) {
    const { rows } = await pool.query(
        "SELECT * FROM directors WHERE id = ($1)",
        [directorId]
    );
    return rows;
}

async function selectDirectorByName(name) {
    const { rows } = await pool.query(
        "SELECT * FROM directors WHERE name = ($1)",
        [name]
    );
    return rows;
}

async function selectDirectorMovies(directorId) {
    // Get all movies by a specific director
    const { rows } = await pool.query(
        "SELECT movies.id AS id, title, yr_released, rating FROM movies JOIN directors ON director_id = directors.id WHERE directors.id = ($1)",
        [directorId]
    );
    return rows;
}

async function updateDirector(directorId, name) {
    const { rows } = await pool.query(
        "UPDATE directors SET name = ($2) WHERE id = ($1) RETURNING id",
        [directorId, name]
    );
    return rows;
}

async function deleteDirector(directorId) {
    const { rows } = await pool.query(
        "DELETE FROM directors WHERE id = ($1) RETURNING id",
        [directorId]
    );
    return rows;
}

// MOVIEGENRE QUERIES

async function selectMovieGenre(movieId) {
    // Gets genres of specific movie
    const { rows } = await pool.query(
        "SELECT * FROM genres WHERE id IN (SELECT genre_id FROM movieGenres WHERE movie_id = ($1))",
        [movieId]
    );
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

async function insertMovieGenre(movieId, genreId) {
    const { rows } = await pool.query(
        "INSERT INTO moviegenres (movie_id, genre_id) VALUES ($1, $2) RETURNING id",
        [movieId, genreId]
    );
    return rows;
}

async function updateMovieGenre(id, movieId, genreId) {
    const { rows } = await pool.query(
        "UPDATE moviegenres SET movie_id = ($2), genre_id = ($3) WHERE id = ($1) RETURNING id",
        [id, movieId, genreId]
    );
    return rows;
}

async function deleteMovieGenre(movieId) {
    await pool.query("DELETE FROM moviegenres WHERE movie_id = ($1)", [
        movieId,
    ]);
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
    selectGenreByGenre,
    updateGenre,
    deleteGenre,
    selectDirectors,
    insertDirector,
    selectDirector,
    selectDirectorByName,
    selectDirectorMovies,
    updateDirector,
    deleteDirector,
    selectMovieGenre,
    selectGenreMovie,
    insertMovieGenre,
    updateMovieGenre,
    deleteMovieGenre,
};
