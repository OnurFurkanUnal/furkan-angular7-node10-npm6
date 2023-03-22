// This code defines several functions for handling requests related to books. These functions use methods of the Book model to interact with the database and return responses to the client. The code also exports these functions so that they can be used in other parts of the application.

// Import the Book model and create a new instance
const Book = require("../models/book");
const book = new Book();

// Define the functions to handle requests
function getBooks(req, res) {
  // Call the getBooks method of the Book model and send the results as a response
  book.getBooks((err, data) => {
    if (err) {
      res.status(500).json({
        success: 0,
        message: "Error getting books.",
      });
    } else {
      res.json({
        success: 1,
        data: data,
      });
    }
  });
}

function getBook(req, res) {
  // Get the id parameter from the request and call the getBook method of the Book model with that id
  const id = req.params.id;
  book.getBook(id, (err, data) => {
    if (err) {
      res.status(500).json({
        success: 0,
        message: "Error getting book.",
      });
    } else {
      res.json({
        success: 1,
        data: data,
      });
    }
  });
}

function addBook(req, res) {
  // Get the data from the request body and call the addBook method of the Book model with that data
  const bookData = req.body;
  book.addBook(bookData, (err, data) => {
    if (err) {
      res.status(500).json({
        success: 0,
        message: "Error adding book.",
      });
    } else {
      res.json({
        success: 1,
        data: data,
      });
    }
  });
}

function updateBook(req, res) {
  // Get the id parameter and data from the request body and call the updateBook method of the Book model with that id and data
  const id = req.params.id;
  const bookData = req.body;
  book.updateBook(id, bookData, (err, data) => {
    if (err) {
      res.status(500).json({
        success: 0,
        message: "Error updating book.",
      });
    } else {
      res.json({
        success: 1,
        data: data,
      });
    }
  });
}

function deleteBook(req, res) {
  // Get the id parameter from the request and call the deleteBook method of the Book model with that id
  const id = req.params.id;
  book.deleteBook(id, (err, data) => {
    if (err) {
      res.status(500).json({
        success: 0,
        message: "Error deleting book.",
      });
    } else {
      res.json({
        success: 1,
        data: data,
      });
    }
  });
}

// Export the functions to be used in other parts of the application
module.exports = {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
};
