/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var models = require('../models');

var sequelizeConnection = models.sequelize;

router.get('/', function (req, res) {

	return sequelizeConnection.sync()


	.then(function(){
		// return models.Customer.findAll()

		return models.Customer.findAll({ include: [ models.Burger ] })
	})
	.then(function(results){
		// customers.forEach(function(value, index){

		// 	value.getBurger()

		// 	.then(function(results){
		// 		console.log(results.dataValues);
		// 	})


		// })
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

		models.Customer.create(
		{
			Burger:{
				burger_name: req.body.burger,
				devoured: '0'
			},
			customerName: ""
			
		},
		{
			include:[models.Burger]

		}

		);

		return res.redirect('/');
	
	})

});

router.put('/update/:burgID/:custID/', function (req, res) {
	// return sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')
	// console.log(req.params.id,"##########")

	// .then(function(){
	return sequelizeConnection.sync()
	//})

	// .then(function(){

	// 	return models.Customer.create(
	// 	{
	// 		customerName:req.body.customer,

	// 	})
	// })

	//.then(function(aCustomer){

		// return models.Burger.findOne({
		// 	where: {
		// 		id:req.params.id
		// 	}
		// })
		// .then(function(aBurger){
		// 	return aCustomer.setBurger(aBurger);
		// })

	//})

	.then(function(){

		return models.Burger.update(
		{
			devoured: '1'
		}, 
		{
			where: {
				id:req.params.burgID
			}
		})
	})
	.then(function(){
		return models.Customer.update(
		{
			customerName: req.body.customer
		}, 
		{
			where: {
				id:req.params.custID
			}
		})
	})
	.then(function(){
		return res.redirect('/');
	})

	
});

router.delete('/delete/:burgID/:custID/', function (req, res) {
	// return sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')


	// .then(function(){
	return sequelizeConnection.sync()
	//})

	.then(function(){

		return models.Burger.destroy( 
		{
			where: {
				id:req.params.burgID
			}
		})
	})
	.then(function(){
		return models.Customer.destroy({
			where:{
				id:req.params.custID
			}

		})

	})
	.then(function(){
		return res.redirect('/');
	})

});

module.exports = router;
