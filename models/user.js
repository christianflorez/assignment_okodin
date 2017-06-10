'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Email field must be properly formatted."
        }
      }
    },
    profileId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasOne(models.Profile, {
          foreignKey: "userId"
        });
      }
    }
  });
  return User;
};