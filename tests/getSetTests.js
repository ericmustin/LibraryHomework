"use strict";

//Assertion library
const should = require('should');

//import files
const library = require('../library.js');
const commandInstructions = require('../databaseModel.js');
const memory = require('../database.js');
const libraryLogic = require('../controller.js');
const errorHandler = require('../errorHandler.js')

// getter/setter tests
describe('the getters and setters', function() {

    describe('the adding method', function() {
        it('should return the correct string to be logged to the command line', function() {
            var displayText = commandInstructions['add ']("The Old Man and the Sea Two, more Sea", "Ernesto Hemingway");
            displayText.should.equal('Added "The Old Man and the Sea Two, more Sea" by "Ernesto Hemingway"');
        });
        it('should return the correct string for the command line if the title already exists', function() {
            var displayText = commandInstructions['add ']("The Old Man and the Sea Two, more Sea", "Ernesto Hemingway");
            displayText.should.equal('Sorry, that title is already in the library, please try again');
        });
    });
    describe('the reading method', function() {
        it('should return correct msg upon updating read property', function() {
            var displayText = commandInstructions['read ']("The Old Man and the Sea Two, more Sea");
            displayText.should.equal('You' + "'" + 've read "The Old Man and the Sea Two, more Sea!"')
        });
        it('should return correct msg if the title has already been read', function() {
            var displayText = commandInstructions['read ']("The Old Man and the Sea Two, more Sea");
            displayText.should.equal('You have already read that book, please choose again!');
        });
        it('should return the correct msg if the book is not in the library', function() {
            var displayText = commandInstructions['read ']("The Old Man and the Sea Three, the Sea was angry that day my friends");
            displayText.should.equal('Sorry, that book is not in your library, please choose again');
        });
    });
    describe('the show all method', function() {
        it('should return all existing titles in the library', function() {
            var displayText = commandInstructions['show all']();
            displayText.should.be.an.instanceOf(Array).and.have.lengthOf(2);
        });
    });
    describe('the show unread method', function() {
        it('should return all read titles in the library', function() {
            commandInstructions['add ']("The Old Man and the Sea Five, Santiago Strikes Back", "Ernesto Hemingway");
            var displayText = commandInstructions['show unread']();
            displayText.should.be.an.instanceOf(Array).and.have.lengthOf(1);
        });
    });
    describe('the show all by method', function() {
        it('should return existing titles for an author in the library', function() {
            var displayText = commandInstructions['show all by ']("Ernesto Hemingway");
            displayText.should.be.an.instanceOf(Array).and.have.lengthOf(2);
        });
        it('should indicate if the author does not exist in the library', function() {
            var displayText = commandInstructions['show all by ']("Kilgore Trout");
            displayText.should.be.type('string').and.equal('Sorry, no books by that author in the library');
        });
    });
    describe('the show all unread by method', function() {
        it('should return existing unread titles for an author in the library', function() {
            var displayText = commandInstructions['show unread by ']("Ernesto Hemingway");
            displayText.should.be.an.instanceOf(Array).and.have.lengthOf(1);
        });
        it('should indicate if the author has no unread titles', function() {
            var displayText = commandInstructions['show unread by ']("Ernest Hemingway");
            displayText.should.be.an.instanceOf(String).and.equal('Sorry, no unread books by that author in the library');
        });
    });
    describe('the quit method', function() {
        it('should return the string quit to the app', function() {
            var displayText = commandInstructions['quit']();
            displayText.should.equal('quit');
        });
    });
});