var mongoose = require('mongoose');
var config   = require('../config/database')[process.env.NODE_ENV || "development"];
mongoose.connect(config.uri);