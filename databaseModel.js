"use strict";

//database object
var memory = require('./database.js');

//getter and setter functions
var commandInstructions = {
    'add ': function(title, author) {
        if (!memory[title]) {
          //stores each book as an object with 3 properties within db object, it's key is it's title
            memory[title] = {
                title: title,
                author: author,
                read: 'unread'
            };
          //success message for CLI
            return ('Added "' + title + '" by "' + author + '"');
        } else {
          //message for duplicate titles
            return ('Sorry, that title is already in the library, please try again');
        }
    },
    'read ': function(title) {
      //check if book exists
        if (memory[title]) {
          //check if book hasn't been read yet
            if (memory[title].read === 'unread') {
              //update status and inform user of update
                memory[title].read = 'read';
                return ('You' + "'" + 've read "' + memory[title].title + '!"');
            } else {
              //inform user that there was no update
                return ('You have already read that book, please choose again!')
            }
        } else {
          //inform user that there was no book to update
            return ('Sorry, that book is not in your library, please choose again');
        }
    },
    'show all': function() {
        //iterates through memory storage and returns each book with formatting
        var bookList = [];
        //iterate through database object
        for (var book in memory) {
          //create formatted string and push into storage array
            bookList.push(('"' + memory[book].title + '"' + ' by ' + '"' + memory[book].author + '"' + "(" + memory[book].read + ") \n"));
        }
        //if array is empty there was no books in the library
        if (bookList.length === 0) {
            return 'Your library is empty!';
        } else {
          //return array of formatted book strings to user
            return bookList;
        }
    },
    'show unread': function() {
        //stores unread books in a temporary array
        var unreadList = [];
        //iterates through database object
        for (var book in memory) {
          //checks if book is unread
            if (memory[book].read === 'unread') {
              //puts unformatted book object into array
                unreadList.push(memory[book]);
            }
        }
        //error handling for edge case
        if (unreadList.length === 0) {
            return "Sorry, no unread books in the library"
        } else {

            //iterates through array of unread book objects and returns array of formatted book strings
            return unreadList.map(function(book) {
                return ('"' + book.title+ '"' + ' by ' + '"'+ book.author + '"' + "(" + book.read + ") \n");
            });
        }
    },
    'show all by ': function(author) {
        //stores books of the author in a temporary array
        var authorBookList = [];
        for (var book in memory) {
          //checks if author property is equal to author argument
            if (memory[book].author === author) {
              //pushes unformatted book object into array
                authorBookList.push(memory[book]);
            }
        }
        //error handling for edge case
        if (authorBookList.length === 0) {
            return 'Sorry, no books by that author in the library';
        } else {
            //iterates through array of author book objects and returns array of formatted book strings
            return authorBookList.map(function(book) {
                return ('"' + book.title + '"' + ' by ' + '"' + book.author + '"' + "(" + book.read + ") \n");
            });
        }
    },
    'show unread by ': function(author) {
        //stores unread books of the author in a temporary array
        var authorUnreadBookList = [];
        for (var book in memory) {
          //checks if both author matches argument and the book is unread
            if (memory[book].author === author) {
                if (memory[book].read === 'unread') {
                  //pushes unformatted book object into array
                    authorUnreadBookList.push(memory[book]);
                }
            }
        }
        //error handling for edge case
        if (authorUnreadBookList.length === 0) {
            return 'Sorry, no unread books by that author in the library';
        } else {
            //iterates through array of unread author book objects and returns array of formatted book strings
            return authorUnreadBookList.map(function(book) {
                return ('"' + book.title + '"' + ' by ' + '"' + book.author + '"' + "(" + book.read + ") \n");
            });
        }
    },
    'quit': function() {
      //passes back quit string to view which has special handler for quit string to terminate program
        return 'quit';
    },
};

module.exports = commandInstructions;