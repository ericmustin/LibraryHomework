"use strict";

//database object
var memory = require('./database.js');

//getter and setter functions
var commandInstructions = {
    'add ': function(title, author) {
        if (!memory[title]) {
            memory[title] = {
                title: title,
                author: author,
                read: 'unread'
            };
            return ('Added "' + title + '" by "' + author + '"');
        } else {
            return ('Sorry, that title is already in the library, please try again');
        }
    },
    'read ': function(title) {
        if (memory[title]) {
            if (memory[title].read === 'unread') {
                memory[title].read = 'read';
                return ('You' + "'" + 've read "' + memory[title].title + '!"');
            } else {
                return ('You have already read that book, please choose again!')
            }
        } else {
            return ('Sorry, that book is not in your library, please choose again');
        }
    },
    'show all': function() {
        //iterates through memory storage and returns each book with formatting
        var bookList = [];
        for (var book in memory) {
            bookList.push(('"' + memory[book].title + '"' + ' by ' + '"' + memory[book].author + '"' + "(" + memory[book].read + ") \n"));
        }
        if (bookList.length === 0) {
            return 'Your library is empty!';
        } else {
            return bookList;
        }
    },
    'show unread': function() {
        //stores unread books in a temporary array
        var unreadList = [];
        for (var book in memory) {
            if (memory[book].read === 'unread') {
                unreadList.push(memory[book]);
            }
        }
        if (unreadList.length === 0) {
            return "Sorry, no unread books in the library"
        } else {
            //interates through temporary unread book array and returns formatted details
            return unreadList.map(function(book) {
                return ('"' + book.title+ '"' + ' by ' + '"'+ book.author + '"' + "(" + book.read + ") \n");
            });
        }
    },
    'show all by ': function(author) {
        //stores books of the author in a temporary array
        var authorBookList = [];
        for (var book in memory) {
            if (memory[book].author === author) {
                authorBookList.push(memory[book]);
            }
        }

        if (authorBookList.length === 0) {
            return 'Sorry, no books by that author in the library';
        } else {
            //interates through temporary author book array and prints formatted details
            return authorBookList.map(function(book) {
                return ('"' + book.title + '"' + ' by ' + '"' + book.author + '"' + "(" + book.read + ") \n");
            });
        }
    },
    'show unread by ': function(author) {
        //stores unread books of the author in a temporary array
        var authorUnreadBookList = [];
        for (var book in memory) {
            if (memory[book].author === author) {
                if (memory[book].read === 'unread') {
                    authorUnreadBookList.push(memory[book]);
                }
            }
        }

        if (authorUnreadBookList.length === 0) {
            return 'Sorry, no unread books by that author in the library';
        } else {
            //interates through temporary author book array and returns formatted details
            return authorUnreadBookList.map(function(book) {
                return ('"' + book.title + '"' + ' by ' + '"' + book.author + '"' + "(" + book.read + ") \n");
            });
        }
    },
    'quit': function() {
        return 'quit';
    },
};

module.exports = commandInstructions;