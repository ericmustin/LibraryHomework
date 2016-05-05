//Library for inputting and outputting books

//Node interface for CL prompts
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//prompt dialogue
rl.setPrompt('>');
//event handlers for Command Line entries 
//callback invoked with by a return or newline
rl.on('line', function(answer) {
    libraryLogic(answer);
    //reprompts the user after the library logic function has completed
    rl.prompt();
});
//callback invoked by a quit command
rl.on('close', function() {
    console.log('Bye!');
    process.exit(0);
});

//storage object
var memory = {};

//Library function, parses user string into command,title,author
//light error handling if the command is not valid
var libraryLogic = function(string) {
    var tempArray = string.split('"');
    var command = tempArray[0];
    var stringOne = tempArray[1];
    var stringTwo = tempArray[3];

    if (!commandInstructions[command]) {
        console.log('sorry, not a valid command, try again');
    } else {
        commandInstructions[command](stringOne, stringTwo);
    }
};

//command instructions objects which holds methods for dealing with each command
var commandInstructions = {
    'add ': function(title, author) {
        if (!memory[title]) {
            memory[title] = {
                title: title,
                author: author,
                read: 'unread'
            };
            console.log('Added "' + title + '" by "' + author + '"');
        }
    },
    'read ': function(title) {
        if (memory[title]) {
            memory[title].read = 'read';
            console.log('You' + "'" + 've read "' + title + '!"');
        }
    },
    'show all': function() {
        //iterates through memory storage and prints each book with formatting
        for (var book in memory) {
            console.log('"' + memory[book].title + '"' + ' by ' + '"' + memory[book].author + '"' + "(", memory[book].read + ")");
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
        //interates through temporary unread book array and prints formatted details
        unreadList.forEach(function(book) {
            console.log('"' + book.title, '"' + ' by ' + '"', book.author + '"' + "(" + book.read + ")");
        });
    },
    'show all by ': function(author) {
        //stores books of the author in a temporary array
        var authorBookList = [];
        for (var book in memory) {
            if (memory[book].author === author) {
                authorBookList.push(memory[book]);
            }
        }

        //interates through temporary author book array and prints formatted details
        authorBookList.forEach(function(book) {
            console.log('"' + book.title, '"' + ' by ' + '"', book.author + '"' + "(" + book.read + ")");
        });
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
        //interates through temporary author book array and prints formatted details
        authorUnreadBookList.forEach(function(book) {
            console.log('"' + book.title, '"' + ' by ' + '"', book.author + '"' + "(" + book.read + ")");
        });
    },
    'quit': function() {
        rl.close();
    }
}

//init
console.log("Welcome to your Library");
rl.prompt();
