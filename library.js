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
        var displayText = libraryLogic(answer);
        if (displayText === 'quit') {
            rl.close();
        } else if (typeof displayText === 'string') {
            console.log(displayText);
        } else if (typeof displayText === 'object') {
            displayText.forEach(function(bookDetail) {
                console.log(bookDetail);
            });
        } else {
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

module.exports = {
    init: init,
    rl: rl
}
