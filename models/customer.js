'use strict';
module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    customerName: DataTypes.STRING
    }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Customer.hasOne(models.Burger);
      }
    }
  });
  return Customer;
};