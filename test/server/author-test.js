// Import necessary modules and files
var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');

var models = require('../../server/models');
var ctrl = require('../../server/controllers/authors');

var res;

// Begin testing
describe('Server controller tests', function () {
  // Before each test, clear the database and create two test authors
  before(function () {
    return models.sequelize
    .sync({ force: true })
    .then(function () {
      models.Author.bulkCreate([
        { name: 'Test author 1', bio: 'Test bio' },
        { name: 'Test author 2', bio: 'Test bio' }
      ]);
    });
  });

  // Before each test, create a new mock response object
  beforeEach(function () {
    res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });
  });

  // Test suite for author functionality
  describe('Author tests', function () {
    // Test for creating a new author
    it('Should create a new author', function (done) {
      var req = httpMocks.createRequest({
        body: { name: 'Test Author', bio: 'Test Bio' }
      });

      ctrl.create(req, res);
      res.on('end', function () {
        var response = JSON.parse(res._getData());
        expect(res.statusCode).to.equal(200);
        expect(response.name).to.equal('Test Author');
        done();
      });
    });

    // Test for fetching all authors
    it('Should fetch all authors', function () {
      req = httpMocks.createRequest();
      ctrl.index(req, res);
      res.on('end', function () {
        var response = JSON.parse(res._getData());
        expect(res.statusCode).to.equal(200);
        expect(response.length).to.be.above(0);
      });
    });

    // Test for fetching an author by ID
    it('Should fetch author by ID', function () {
      req = httpMocks.createRequest({
        params: { id: 1 }
      });
      ctrl.show(req, res);
      res.on('end', function () {
        var response = JSON.parse(res._getData());
        expect(res.statusCode).to.equal(200);
        expect(response.name).to.equal('Test author 1');
      });
    });

    // Test for updating an author
    it('Should update an author', function () {
      req = httpMocks.createRequest({
        params: { id: 1 },
        body: { name: 'Updated name', bio: 'Updated Bio' }
      });

      ctrl.update(req, res);
      res.on('end', function () {
        // Fetching the updated author from the database and checking if the updated author has the expected name and bio
        models.Author.findById(1)
          .then(function (result) {
            var updatedAuthor = result.get({ plain: true });
            expect(updatedAuthor.name).to.equal('Updated name');
            expect(updatedAuthor.bio).to.equal('Updated Bio');
          });
      });
    });

    // Test for deleting an author by ID
    it('Should delete an author by ID', function () {
      req = httpMocks.createRequest({
        params: { id: 1 }
      });

      ctrl.delete(req, res);
      res.on('end', function () {
        // Ensure that the author does not exist in the database
        models.Author.findById(1)
          .then(function (response) {
            expect(response).to.equal(null);
          });
      });
    });
  });
});
