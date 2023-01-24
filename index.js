const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let movies = [
  {
    name: 'War',
    category: 'Actiooon',
    id: 2,
  },
  {
    name: 'Planes',
    category: 'Adventuree',
    id: 3,
  },
  {
    name: 'GOT',
    category: 'History',
    id: 4,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((movie) => movie.id === id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).end();
  }
});

app.post('/movies', (req, res) => {
  const movie = req.body;
  const ids = movies.map((movie) => movie.id);
  const maxId = Math.max(...ids);
  const newMovie = {
    id: maxId + 1,
    category: movie.category,
    name: movie.name,
  };
  movies = [...movies, newMovie];
  res.json(newMovie);
});

app.put('/movies/:id', (req, res) => {
  const id = Number(req.params.id);
  const movie = req.body;
  const index = movies.findIndex((item) => item.id === id);
  movies[index] = req.body;
  res.json(movie);
});

app.delete('/movies/:id', (req, res) => {
  const id = Number(req.params.id);
  movies = movies.filter((movie) => movie.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
