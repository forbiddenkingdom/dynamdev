import express from 'express';
import cors from 'cors';
import movie from './routes/api/movie.js';

const app = express();

app.use(cors())

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/movie', movie);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
