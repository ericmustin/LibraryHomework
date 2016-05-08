"use strict";
//Library for inputting and outputting books

//controller
var libraryLogic = require('./controller.js');
//Node interface for CL prompts
var readline = require('readline');

//CLI interface setup
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var init = function() {
    //event handlers for Command Line entries 

    //1. callback invoked with a return or newline
    rl.on('line', function(answer) {
        //passes input to controller
        var displayText = libraryLogic(answer);
        //checks for quit command
        if (displayText === 'quit') {
            rl.close();
        } else if (typeof displayText === 'string') {
            //logs statements from error messages and simple strings
            console.log(displayText);
        } else if (typeof displayText === 'object') {
            //iterates over arrays from show all and show unread and logs them
            displayText.forEach(function(bookDetail) {
                console.log(bookDetail);
            });
        } else {
            //error handling for edge case
            console.log('Error, please try again using proper formatting')
        }
        //reprompts the user after the library logic function has completed
        rl.prompt();
    });

    //2. callback invoked by a quit command
    rl.on('close', function() {
        console.log('Bye!');
        process.exit(0);
    });

    //welcome and prompt user    
    console.log("Welcome to your Library");
    rl.setPrompt('>');
    rl.prompt();
};

//init
init();

//make available for testing and other files
module.exports = {
    init: init,
    rl: rl
};