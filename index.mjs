// Import necessary modules
import express from 'express'; // Express framework to create the server
import bodyParser from 'body-parser'; // Middleware to parse request bodies
import moviesRouter from './routes/movies.mjs'; // Import the movies router

// Create an instance of an Express application
const app = express();

// Define the port the server will run on, using an environment variable or default to 3000
const port = process.env.PORT || 3000;

// Use built-in middleware to parse JSON bodies from HTTP requests
app.use(bodyParser.json());

// Use the movies router for routes starting with /movies
app.use('/movies', moviesRouter);

// Error handling middleware for catching and responding to errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ message: err.message }); // Respond with a 500 error and the error message
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // Log the server start and port information
});
