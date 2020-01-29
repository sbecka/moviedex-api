require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const MOVIEDEX = require('./moviedex.json');

const app = express();

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN;
    const authorToken = req.get('Authorization');

    if (!authorToken || authorToken.split(' ')[1] !== apiToken) {
        res.status(401).json({ error: 'Unauthorized request' })
    };

    next();
})
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
        
        movies = movies.filter(movie => 
            movie.avg_vote >= vote
        );
    };

    res.json(movies);
    
});

app.use((error, req, res, next) => {
    let response;
    if (process.env.NODE_ENV === 'production') {
        response = { error: { message: 'server error' }};
    } else {
        response = { error };
    }
    res.status(500).json(response);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT);