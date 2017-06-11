'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    likerId: DataTypes.INTEGER,
    likeeId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Like.belongsTo(models.User, {
          foreignKey: "likerId"
        });

        Like.belongsTo(models.User, {
          foreignKey: "likeeId"
        });
      }
    }
  });
  return Like;
};