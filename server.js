const express = require('express');
const morgan = require('morgan');
const MOVIEDEX = require('./moviedex.json');

const app = express();

app.use(morgan('dev'));

// endpoint movie with query params: genre, country, avg_vote



app.get('/movie', function handleGetMovie(req, res) {
    const { genre, country, avg_vote } = req.query;
    let movies = MOVIEDEX;
    if (genre) {
        movies = movies.filter(movie => 
            movie.genre.toLowerCase().includes(genre.toLowerCase())
        );
    };

    if (country) {
        movies = movies.filter(movie => 
            movie.country.toLowerCase().includes(country.toLowerCase())
        );
    };

    if (avg_vote) {
        let vote = Number(avg_vote);

        if (avg_vote > 10 || avg_vote < 0) {
            res.status(400).send('Average vote must be between 0 and 10.');
        };        
        console.log(vote);
        
        movies = movies.filter(movie => 
            movie.avg_vote >= vote
        );
    };

    res.json(movies);
    }

);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}.`);
});