var express    = require('express');
var path       = require('path');
var _          = require('underscore');
var router     = express.Router();
var mongoose   = require('mongoose');
var tools      = require('../lib/tools');


router.get('/signup', (req, res) => {
	res.render('user/signup');
});

router.post('/save', (req, res) => {
	if(!req.body || !req.body.email || !req.body.password)
		return res.json({ error: 'Invalid authentication.' });

	// get/create the necessary info
	var address        = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var uuid           = tools.createUuid();
	var token          = tools.createToken(uuid, address);
	var qrcode         = tools.createQrCode(uuid);
	var saltedPassword = tools.createPassword(req.body.password);

	// create the new user
	mongoose.model('user').create({ 
		uuid     : uuid, 
		email    : req.body.email, 
		password : saltedPassword,
	}, function (error, data) {
		console.log(error);
		if(error)
			return res.json({ error: 'Invalid authentication.' });

		// send the confirmation code to email
		tools.mailto({
			email: req.body.email, 
			subject: 'Proxyfi Account Creation.',
			html : '<h3>Welcome ' + req.body.email + '!</h3> <div>Validation key:</div> <h1><b>' + uuid + '</b></h1>',
		}, function (error, info) {
			res.json({ img: qrcode, token: token, email: req.body.email });
		});
	});
});

router.post('/signin', (req, res) => {
	if(_.isUndefined(req.body.email) || _.isUndefined(req.body.password))
		return res.json({ error: 'Incorrect Email or Password!' });

	mongoose.model('user').findOne({ email: req.body.email }, function (error, data) {
		if(error)
			return res.json({ error: 'Databse Error.' });
		if(!data || !tools.checkPassword(req.body.password, data.password))
			return res.json({ error: 'Incorrect Email or Password!'});

		var address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		var token   =  tools.createToken(data.uuid, address);

		res.json({ success: true, token: token });
	});
});

router.post('/signout', (req, res) => {
	var credentials = tools.checkToken(req.body.token);
	if(!credentials)
		return res.json({});

	// todo: check in the bank and remove credetial
	return res.json({});
});

module.exports = router;