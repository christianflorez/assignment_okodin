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
        
        // Likes associations
        User.hasMany(models.Like, {
          foreignKey: "likerId"
        });

        User.belongsToMany(models.User, {
          through: models.Like,
          as: "liker",
          foreignKey: "likerId"
        });

        User.hasMany(models.Like, {
          foreignKey: "likeeId"
        });

        User.belongsToMany(models.User, {
          through: models.Like,
          as: "likee",
          foreignKey: "likeeId"
        });

        // Views associations
        User.hasMany(models.View, {
          foreignKey: "viewerId"
        });

        User.belongsToMany(models.User, {
          through: models.View,
          as: "viewer",
          foreignKey: "viewerId"
        });

        User.hasMany(models.View, {
          foreignKey: "vieweeId"
        });

        User.belongsToMany(models.User, {
          through: models.View,
          as: "viewee",
          foreignKey: "vieweeId"
        });
      }
    }
  });
  return User;
};