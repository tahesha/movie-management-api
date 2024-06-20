// Import the mongoose library to interact with MongoDB
import mongoose from 'mongoose';

// MongoDB connection URI
const uri = "mongodb+srv://taheshao:ASDFKJHG@mongopractice.pvywpbp.mongodb.net/?retryWrites=true&w=majority&appName=MongoPractice";
// MongoDB connection string

// Attempt to connect to MongoDB using mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // If the connection is successful, log a success message
    console.log('Connected to MongoDB');
    // Close the connection to MongoDB after the successful connection test
    mongoose.connection.close();
  })
  .catch(err => {
    // If there is an error connecting, log the error message
    console.error('Could not connect to MongoDB', err);
  });


