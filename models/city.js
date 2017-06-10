'use strict';
module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define('City', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        City.hasMany(models.Location, {
          foreignKey: "cityId"
        });
      }
    }
  });
  return City;
};