"use strict";

//Assertion library
const should = require('should');

//import files
const library = require('../library.js');
const commandInstructions = require('../databaseModel.js');
const memory = require('../database.js');
const libraryLogic = require('../controller.js');
const errorHandler = require('../errorHandler.js')



//controller tests
describe('controller', function() {

    it('should return the correct string when passed an error by the ErrorHandler', function() {
        var errorText = libraryLogic('This is a bad input');
        errorText.should.equal('Error, please try again using proper formatting');
    });
    it('should return correct string when passed valid input for setter funcs(add/read)', function() {
        var addText = libraryLogic('add "the book" "the author"');
        var readText = libraryLogic('read "the book"');
        addText.should.be.an.instanceOf(String).and.equal('Added "the book" by "the author"');
        readText.should.be.an.instanceOf(String).and.equal('You' + "'" + 've read "the book!"');
    });
    it('should return correct array when passed valid input for getter funcs(show all/unread(by) )', function() {
        var showAllText = libraryLogic('show all');
        var showAllByText = libraryLogic('show all by "the author"');
        var showUnreadText = libraryLogic('show unread');
        var showUnreadByText = libraryLogic('show unread by "Ernesto Hemingway"')

        showAllText.should.be.an.instanceOf(Array).and.have.lengthOf(4);
        showAllByText.should.be.an.instanceOf(Array).and.have.lengthOf(1);
        showUnreadText.should.be.an.instanceOf(Array).and.have.lengthOf(1);
        showUnreadByText.should.be.an.instanceOf(Array).and.have.lengthOf(1);
    });
    it('should return correct quit message when passed valid quit command', function() {
        var quitText = libraryLogic('quit');
        quitText.should.be.an.instanceOf(String).and.equal('quit');
    });
});