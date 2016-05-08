"use strict";

//Library function, parses user string into command,title,author
//error handling if the command is not valid
var errorHandler = require('./errorHandler');
var commandInstructions = require('./databaseModel.js');

var libraryLogic = function(string) {
    var cleansedString = errorHandler.parser(string);
    if (cleansedString === errorHandler.errorMessage) {
        return cleansedString;
    } else {
        var tempArray = string.split('"');
        var command = tempArray[0];
        var stringOne = tempArray[1];
        var stringTwo = tempArray[3];

        if (!commandInstructions[command]) {
            return errorHandler.errorMessage;
        } else {
            return commandInstructions[command](stringOne, stringTwo);
        }
    }
};

module.exports = libraryLogic;