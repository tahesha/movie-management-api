// Import necessary modules
import express from 'express'; // Express framework to create the server and define routes
import mongoose from 'mongoose'; // Mongoose library to interact with MongoDB

// Create a new router object
const router = express.Router();

// MongoDB connection URI
const uri = "mongodb+srv://taheshao:ASDFKJHG@mongopractice.pvywpbp.mongodb.net/?retryWrites=true&w=majority&appName=MongoPractice";
 // MongoDB connection string

// Connect to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB')) // Successful connection message
  .catch(err => console.error('Could not connect to MongoDB', err)); // Error message if connection fails

// Define a Mongoose schema for movies with no strict schema (dynamic schema)
const movieSchema = new mongoose.Schema({}, { strict: false });
// Create a Mongoose model for movies
const Movie = mongoose.model('Movie', movieSchema);

// Middleware to check MongoDB connection status for each request
router.use((req, res, next) => {
  const dbState = mongoose.connection.readyState; // Get current state of the MongoDB connection
  console.log('Database connection state:', dbState); // Debugging statement to log the connection state
  if (dbState !== 1) { // 1 means connected
    return res.status(500).json({ message: 'Database connection error' }); // Respond with an error if not connected
  }
  next(); // Proceed to the next middleware or route handler
});

// GET all movies
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all movies'); // Debugging statement
    const movies = await Movie.find(); // Fetch all movies from the collection
    console.log('Movies fetched:', movies); // Debugging statement to log the fetched movies
    res.json(movies); // Respond with the array of movie documents
  } catch (error) {
    console.error('Error fetching movies:', error.message); // Debugging statement to log the error
    res.status(500).json({ message: error.message }); // Respond with a 500 error if an exception occurs
  }
});

// GET a single movie by ID
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching movie with ID:', req.params.id); // Debugging statement
    const movie = await Movie.findById(req.params.id); // Fetch movie by ID
    if (!movie) {
      console.log('Movie not found'); // Debugging statement if movie not found
      return res.status(404).json({ message: 'Movie not found' }); // Respond with a 404 error if not found
    }
    console.log('Movie fetched:', movie); // Debugging statement to log the fetched movie
    res.json(movie); // Respond with the movie document
  } catch (error) {
    console.error('Error fetching movie:', error.message); // Debugging statement to log the error
    res.status(500).json({ message: error.message }); // Respond with a 500 error if an exception occurs
  }
});

// POST a new movie
router.post('/', async (req, res) => {
  const movie = new Movie(req.body); // Create a new movie document from the request body
  try {
    const newMovie = await movie.save(); // Save the new movie to the collection
    console.log('New movie saved:', newMovie); // Debugging statement to log the saved movie
    res.status(201).json(newMovie); // Respond with the created movie document and status 201 (Created)
  } catch (error) {
    console.error('Error saving movie:', error.message); // Debugging statement to log the error
    res.status(400).json({ message: error.message }); // Respond with a 400 error if validation fails
  }
});

// PUT update a movie by ID
router.put('/:id', async (req, res) => {
  try {
    console.log('Updating movie with ID:', req.params.id); // Debugging statement
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update movie by ID
    if (!movie) {
      console.log('Movie not found'); // Debugging statement if movie not found
      return res.status(404).json({ message: 'Movie not found' }); // Respond with a 404 error if not found
    }
    console.log('Movie updated:', movie); // Debugging statement to log the updated movie
    res.json(movie); // Respond with the updated movie document
  } catch (error) {
    console.error('Error updating movie:', error.message); // Debugging statement to log the error
    res.status(400).json({ message: error.message }); // Respond with a 400 error if validation fails
  }
});

// DELETE a movie by ID
router.delete('/:id', async (req, res) => {
  try {
    console.log('Deleting movie with ID:', req.params.id); // Debugging statement
    const movie = await Movie.findByIdAndDelete(req.params.id); // Delete movie by ID
    if (!movie) {
      console.log('Movie not found'); // Debugging statement if movie not found
      return res.status(404).json({ message: 'Movie not found' }); // Respond with a 404 error if not found
    }
    console.log('Movie deleted'); // Debugging statement to log the deletion
    res.json({ message: 'Movie deleted' }); // Respond with a success message
  } catch (error) {
    console.error('Error deleting movie:', error.message); // Debugging statement to log the error
    res.status(500).json({ message: error.message }); // Respond with a 500 error if an exception occurs
  }
});

// Export the router to be used in other parts of the application
export default router;
