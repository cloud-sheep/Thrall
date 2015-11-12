var express = require('express');
var path    = require('path');
var _       = require('underscore');
var models  = require('../models');
var tools   = require('../lib/tools');
var router  = express.Router();

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
	models.user.create({ 
		uuid        : uuid, 
		email       : req.body.email, 
		password    : saltedPassword,
		confirmed   : false,
		confirmedAt : new Date(),
		createAt    : new Date(),
		updatedAt   : new Date(),
	}).then(function (data) {
		// send the confirmation code to email
		tools.mailto({
			email: req.body.email, 
			subject: 'Proxyfi Account Creation.',
			html : '<h3>Welcome ' + req.body.email + '!</h3> <div>Validation key:</div> <h1><b>' + uuid + '</b></h1>',
		}, function (error, info) {
			res.json({ img: qrcode, token: token, email: req.body.email });
		});
	}, function (error) {
		res.json({ error: 'Invalid authentication.' });
	});
});

router.post('/signin', (req, res) => {
	if(_.isUndefined(req.body.email) || _.isUndefined(req.body.password))
		return res.json({ error: 'Incorrect Email or Password!' });

	models.user.findOne({ email: req.body.email }).then(function (data) {
		if(!data || !tools.checkPassword(req.body.password, data.password))
			return res.json({ error: 'Incorrect Email or Password!'});

		var address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		var token   =  tools.createToken(data.uuid, address);

		res.json({ success: true, token: token });
	}, function (error) {
		res.json({ error: 'Databse Error.' });
	});
});

router.post('/signout', (req, res) => {
	var token = req.headers['authorization'] || req.body.token;
	var credentials = tools.checkToken(token);
	if(!credentials)
		return res.json({});

	// todo: check database and remove credetial
	return res.json({});
});

router.post('/productList', (req, res) => {
	var token = req.headers['authorization'] || req.body.token;
	var credentials = tools.checkToken(token);
	if(!credentials)
		return res.json({ error: 'Access denied.' });

	// model.product.find({ email: })....
	return res.json({ 
		currency: "R$",
		products: [
			{ name: "Beer", price: 5.29, quantity: 5 },
			{ name: "Steak", price: 27.90, quantity: 1 },
			{ name: "Popsicle", price: 5.37, quantity: 2 },
			{ name: "Soda", price: 4.33, quantity: 3 },
		] 
	});
});

module.exports = router;