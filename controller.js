"use strict";

//Library function, parses user string into command,title,author
//error handling if the command is not valid
var errorHandler = require('./errorHandler');
var commandInstructions = require('./databaseModel.js');

var libraryLogic = function(string) {
    //passes string to errorhandler
    var cleansedString = errorHandler.parser(string);

    //returns error message passed back by handler
    if (cleansedString === errorHandler.errorMessage) {
        return cleansedString;
    } else {
    //if validated, creates an array with from the string [0] as the command [1] as the 1st arg, [3] as the 2nd arg
        var tempArray = string.split('"');
        var command = tempArray[0];
        var stringOne = tempArray[1];
        var stringTwo = tempArray[3];

        if (!commandInstructions[command]) {
            //error handler for edge cases
            return errorHandler.errorMessage;
        } else {
            //invokes database getter/setter functions
            return commandInstructions[command](stringOne, stringTwo);
        }
    }
};

//make available for testing and other files
module.exports = libraryLogic;