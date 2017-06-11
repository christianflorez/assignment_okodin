'use strict';
module.exports = function(sequelize, DataTypes) {
  var View = sequelize.define('View', {
    viewerId: DataTypes.INTEGER,
    vieweeId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        View.belongsTo(models.User, {
          foreignKey: "viewerId"
        });

        View.belongsTo(models.User, {
          foreignKey: "vieweeId"
        });
      }
    }
  });
  return View;
};