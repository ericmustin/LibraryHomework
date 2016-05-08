"use strict";

//Assertion library
const should = require('should');

//import files
const library = require('../library.js');
const commandInstructions = require('../databaseModel.js');
const memory = require('../database.js');
const libraryLogic = require('../controller.js');
const errorHandler = require('../errorHandler.js')

//error handler tests
describe('Error Handler', function() {

    describe('Inputs with improper spacing', function() {
        it('should catch inputs with extra spaces after command', function() {
            var returnStatement = errorHandler.parser('show all ');
            returnStatement.should.equal(errorHandler.errorMessage);
        })
        it('should catch inputs with >1 spaces between the command and title/author', function() {
            var returnStatement = errorHandler.parser('read  "the book"');
            returnStatement.should.equal(errorHandler.errorMessage);
        });
        it('should catch inputs with >1 spaces between title and author', function() {
            var returnStatement = errorHandler.parser('add "the book"  "the author"');
            returnStatement.should.equal(errorHandler.errorMessage);
        });
        it('should catch inputs with extra spaces after title or author', function() {
            var returnStatement = errorHandler.parser('add "the book" "the author" ');
            var returnStatementTwo = errorHandler.parser('read "the book" ');
            returnStatement.should.equal(errorHandler.errorMessage);
            returnStatementTwo.should.equal(errorHandler.errorMessage);
        });
    });
    describe('Inputs with improper commands', function() {
        it('should catch inputs with a unrecognized command', function() {
            var returnStatement = errorHandler.parser('destroy "the book" "the author"');
            returnStatement.should.equal(errorHandler.errorMessage);
        });
        it('should catch inputs with empty commands', function() {
            var returnStatement = errorHandler.parser('');
            returnStatement.should.equal(errorHandler.errorMessage);
        });
        it('should catch inputs with proper commands but extra arguments', function() {
            var returnStatement = errorHandler.parser('add "the book" "the author" "the other author"');
            var returnStatementTwo = errorHandler.parser('show all by "the book" "the author"');
            returnStatement.should.equal(errorHandler.errorMessage).and.equal(returnStatementTwo);
        });
        it('should catch inputs with proper commands but too few arguments', function() {
            var returnStatement = errorHandler.parser('add "the book"');
            returnStatement.should.equal(errorHandler.errorMessage);
        });
        it('should catch inputs with empty arguments', function() {
            var returnStatement = errorHandler.parser('read ""');
            returnStatement.should.equal(errorHandler.errorMessage);
        });
    });
});
