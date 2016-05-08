"use strict";

//The individual test files build up each other, creating and growing a database so they need to be run in a specific order
//This file is indicated in the script
require('./databaseTests.js');
require('./getSetTests.js');
require('./controllerTests.js');
require('./errorHandlerTests.js');