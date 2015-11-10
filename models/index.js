var path     = require('path');
var fs       = require('fs');
var database = require('./database');

fs.readdirSync(__dirname).forEach(function (file) {
	if(file !== 'index.js' && file !== 'database.js' && file !== '')
		require(path.join(__dirname, file)).sync();
});