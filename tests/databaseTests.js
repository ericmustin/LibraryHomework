"use strict";

//Assertion library
const should = require('should');

//import files
const library = require('../library.js');
const commandInstructions = require('../databaseModel.js');
const memory = require('../database.js');
const libraryLogic = require('../controller.js');
const errorHandler = require('../errorHandler.js')

//database tests
describe('the database', function() {

    describe('saving to the database', function() {

        before(function() {
            commandInstructions['add ']("The Old Man and the Sea", "Ernest Hemingway");
        });

        it('should contain a database object', function() {
            should.exist(memory);
            memory.should.be.an.instanceOf(Object);
        });

        it('should save an entry as an object under the title key', function() {
            commandInstructions['add ']("The Old Man and the Sea", "Ernest Hemingway");
            should.exist(memory['The Old Man and the Sea']);
            memory['The Old Man and the Sea'].should.be.an.instanceOf(Object);
        });
        it('should save an entry as an object w/a title,author,read property', function() {
            memory['The Old Man and the Sea'].should.have.keys('title', 'author', 'read');
        });
        it('should save entry object values as the title,author, and default to unread', function() {
            memory['The Old Man and the Sea']['author'].should.equal('Ernest Hemingway');
            memory['The Old Man and the Sea']['title'].should.equal('The Old Man and the Sea');
            memory['The Old Man and the Sea']['read'].should.equal('unread');
        });
    });

    describe('updating the database', function() {
        before(function() {
            commandInstructions['read ']("The Old Man and the Sea");
        });

        it('should change a book title from unread to read', function() {
            memory['The Old Man and the Sea']['read'].should.equal('read');
        });
    });

    describe('not updating the database for existing titles', function() {
        before(function() {
            commandInstructions['add ']("The Old Man and the Sea", "Ernest Hemingway");
        });

        it('should maintain an accurate count of records', function() {
            Object.keys(memory).length.should.equal(1);
        });

        it('should not overwrite an existing record of the same title', function() {
            commandInstructions['add ']("The Old Man and the Sea", "Not Ernest Hemingway");
            should.exist(memory['The Old Man and the Sea']);
            memory['The Old Man and the Sea']['author'].should.equal('Ernest Hemingway');
            memory['The Old Man and the Sea']['author'].should.not.equal('Not Ernest Hemingway');
        });

        it('should not duplicate the record', function() {
            commandInstructions['add ']("The Old Man and the Sea", "Not Ernest Hemingway");
            Object.keys(memory).length.should.equal(1);
        })
    });
});
