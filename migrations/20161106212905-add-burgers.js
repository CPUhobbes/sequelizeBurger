'use strict';

var models = require("../models");

module.exports = {
  up: function (queryInterface, Sequelize) {

    return models.Burger.bulkCreate([
      {
        burger_name:"Cheeseburger",
        devoured:"0"
      },
      {
        burger_name:"Hamburger",
        devoured:"0"
      },
      {
        burger_name:"Bacon Cheeseburger",
        devoured:"0"
      },
      {
        burger_name:"Veggie Burger",
        devoured:"0"
      },
      {
        burger_name:"Chicken Burger",
        devoured:"0"
      },
    ]);
  },

  down: function (queryInterface, Sequelize) {
    var removeList = [
        "Cheeseburger",
        "Hamburger",
        "Bacon Cheeseburger",
        "Veggie Burger",
        "Chicken Burger"
    ];

    return models.Burger.max('id')
      .then(function(results){

        return models.Burger.destroy({where:{burger_name: removeList}})
        .then(function(recordsDestroyed){

          var newKey = results-(recordsDestroyed-1) ;

          var sequelize = new Sequelize('burgers_db', 'root', '', {dialect: 'mysql'});
          return sequelize.query('ALTER TABLE Burgers AUTO_INCREMENT = '+newKey);
      })
    })
  }
};
