"use strict";

//The tests build on each other so they need to be run a specific order
//This file is indicated in the script path
require('./databaseTests.js');
require('./getSetTests.js');
require('./controllerTests.js');
require('./errorHandlerTests.js');