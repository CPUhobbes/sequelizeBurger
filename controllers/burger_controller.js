/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var models = require('../models');

var sequelizeConnection = models.sequelize;


router.get('/', function (req, res) {
	// return sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')


	// .then(function(){
	return sequelizeConnection.sync()
	//})

	.then(function(){
		return models.Burger.findAll()
	

	})
	.then(function(results){

		var burgerObj = {burgers:results};
		return res.render('index', burgerObj);
	})

});


router.post('/create', function (req, res) {
	// return sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')


	// .then(function(){
	return sequelizeConnection.sync()
	//})

	.then(function(){

		models.Burger.create(
		{
			burger_name: req.body.burger,
			devoured: '0'
		});

		return res.redirect('/');
	
	})

});

router.put('/update/:id', function (req, res) {
	// return sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')


	// .then(function(){
	return sequelizeConnection.sync()
	//})

	.then(function(){

		models.Burger.update(
		{
			devoured: '1'
		}, 
		{
			where: {
				id:req.params.id
			}
		});

		return res.redirect('/');
	
	});
});

router.delete('/delete/:id', function (req, res) {
	// return sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')


	// .then(function(){
	return sequelizeConnection.sync()
	//})

	.then(function(){

		models.Burger.destroy( 
		{
			where: {
				id:req.params.id
			}
		});

		return res.redirect('/');
	
	});
});

module.exports = router;
