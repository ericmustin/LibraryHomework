# Library HW Introduction

Library HW creates an in memory library with the following functions:
- add "$title" "$author": adds a book to the library with the given title and author. All books are unread by default.
- read "$title": marks a given book as read.
- show all: displays all of the books in the library
- show unread: display all of the books that are unread
- show all by "$author": shows all of the books in the library by the given author.
- show unread by "$author": shows the unread books in the library by the given author
- quit: quits the program.

## Getting Started

There are a few dependencies for testing, which were installed using npm. To learn more about the NPM package manager, please see their docs [NPM Doc](https://www.npmjs.com/)  Before running locally, make sure you have npm installed, then cd into the repository and run the following command

```
npm install
```
The main file is library.js.  To run the program, use the following command
```
npm start
```

##Testing
All tests were written with the MochaJS Testing Framework and ShouldJS assertion library.  To learn more please see their documentation [Mocha Doc](https://mochajs.org/) [ShouldJS Doc](https://github.com/shouldjs/should.js) . Run Tests with the following command
```
npm test
```
##Contributors
- Eric Mustin ([Eric Mustin](https://github.com/ericmustin))

Please feel free to reach out if you have any questions. Enjoy!