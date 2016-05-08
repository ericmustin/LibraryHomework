"use strict";

var commandInstructions = require('./databaseModel.js')

//error message
const errorMessage = "Error, please try again using proper formatting";

// Error Handler function
var parser = function(string) {

    //commands grouped by number of expected arguments
    var groupOne = ['show all', 'show unread', 'quit'];
    var groupTwo = ['show all by ', 'show unread by ', 'read '];
    var groupThree = ['add '];

    //divides arguments according to quotation marks surrounding the author or title
    var commands = string.split('"');

    //checks to make sure it's a valid command
    if (!commandInstructions[commands[0]]) {
        return errorMessage;
    } else if (groupOne.indexOf(commands[0]) >= 0) {
        //checks that commands which take no arguments are not being passed any arguments
        if (commands.length > 1) {
            return errorMessage;
        }
    } else if (groupTwo.indexOf(commands[0]) >= 0) {
        //checks that commands which take 1 argument are not being passed more than 1 arguments and have no extra text
        if ((commands.length - 1) % 2 !== 0 || commands.length !== 3 || commands[2] !== '' || commands[1] === '') {
            return errorMessage;
        }
    } else if (groupThree.indexOf(commands[0]) >= 0) {
        //checks that commands which take 2 argument are not being passed more than 2 arguments and have no extra text
        if ((commands.length - 1) % 2 !== 0 || commands.length !== 5 || commands[2] !== ' ' || commands[4] !== '' || commands[1 === '' || commands[3] === '']) {
            return errorMessage;
        }
    } else {
        //passes back original input if no errors are found
        return string;
    }
};

module.exports = {
    parser: parser,
    errorMessage: errorMessage
};
