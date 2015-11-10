var mongoose = require('mongoose');

module.exports.sync = function () {
	var schema = new mongoose.Schema({  
	    uuid      : { type: String, index: true, unique: true, required: true, },
	    email     : { type: String, unique: true, required: true, },
	    password  : { type: String, required: true, },
	    created   : { type: Date, default: Date.now, },
	    confirmed : { type: Boolean, default: false, },
	    confirmedAt : {type: Date, default: Date.now },
	});

	mongoose.model('user', schema);
};