const express = require('express');
const morgan = require('morgan');
const MOVIEDEX = require('./moviedex.json');

const app = express();

app.use(morgan('dev'));

app.use((req, res) => {
    res.send('Hello, world!');
});

// endpoint movie with query params: genre, country, avg_vote



app.get('/movie', function handleGetMovie(req, res) {
    const { genre, country, avg_vote } = req.query;
    let movies 
    if (genre) {

    }
    
    }
);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}.`);
});