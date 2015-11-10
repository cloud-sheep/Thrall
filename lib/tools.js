var _          = require('underscore');
var uuid       = require('uuid');
var qrcode     = require('qrcode-js');
var bcrypt     = require('bcryptjs');
var jwt        = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var config     = require('../config/app')[process.env.NODE_ENV || "development"];

module.exports.createUuid = function () {
	return uuid.v4();
};

module.exports.createToken = function (uuid, address) {
	return jwt.sign({ uuid: uuid, address: address }, config.tokenSecret);
};

module.exports.checkToken = function (token) {
	var result = null;

	try {
		result = jwt.verify(token, config.tokenSecret);
	}
	catch(e) {
	}

	if(!_.isObject(result))
		return null;
	return result;
};

module.exports.createQrCode = function (text) {
	return qrcode.toDataURL(text, 5);
};

module.exports.createPassword = function (password) {
	return bcrypt.hashSync(password, 10);
};

module.exports.checkPassword = function (password, saltedPassword) {
	return bcrypt.compareSync(password, saltedPassword);
};

module.exports.mailto = function (data, callback) {
	var transporter = nodemailer.createTransport({
		service: config.mailer.service,
		  auth: {
		    user: config.mailer.user,
		    pass: config.mailer.password,
		  }
	});

	var mailOptions = {
	    from: 'noreply <'+config.mailer.user+'>', 
	    to: data.email,
	    subject: data.subject,
	    html: data.html,
	};
	 
	transporter.sendMail(mailOptions, callback);
};