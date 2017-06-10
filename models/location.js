'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    cityId: DataTypes.INTEGER,
    distance: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Location.hasMany(models.Profile, {
          foreignKey: "locationId"
        });

        Location.belongsTo(models.City, {
          foreignKey: "cityId"
        });
      }
    }
  });
  return Location;
};