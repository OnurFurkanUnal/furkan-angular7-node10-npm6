// Require the `Book` model from the `../models/` directory
Book = require('../models/').Book;

// Export an object containing several methods for handling HTTP requests for book resources
module.exports= {
  // Handles GET requests to the `/books` endpoint
  index(req, res) {
    // Finds all books using the `findAll()` method from Sequelize
    Book.findAll()
      // Sends back the books as a JSON response with a 200 status code
      .then(function (books) {
        res.status(200).json(books);
      })
      // Sends back an error as a JSON response with a 500 status code
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  // Handles GET requests to the `/books/:id` endpoint
  show(req, res) {
    // Finds a single book by its ID using the `findById()` method from Sequelize
    Book.findById(req.params.id)
    // Sends back the book as a JSON response with a 200 status code
    .then(function (book) {
      res.status(200).json(book);
    })
    // Sends back an error as a JSON response with a 500 status code
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  // Handles POST requests to the `/books` endpoint
  create(req, res) {
    // Creates a new book using the `create()` method from Sequelize with the request body as the data
    Book.create(req.body)
      // Sends back the new book as a JSON response with a 200 status code
      .then(function (newBook) {
        res.status(200).json(newBook);
      })
      // Sends back an error as a JSON response with a 500 status code
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  // Handles PUT requests to the `/books/:id` endpoint
  update(req, res) {
    // Updates a book with the given ID using the `update()` method from Sequelize with the request body as the data
    Book.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    // Sends back the number of updated records as a JSON response with a 200 status code
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    // Sends back an error as a JSON response with a 500 status code
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  // Handles DELETE requests to the `/books/:id` endpoint
  delete(req, res) {
    // Deletes a book with the given ID using the `destroy()` method from Sequelize
    Book.destroy({
      where: {
        id: req.params.id
      }
    })
    // Sends back the number of deleted records as a JSON response with a 200 status code
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    // Sends back an error as a JSON response with a 500 status code
    .catch(function (error){
      res.status(500).json(error);
    });
  }
};
