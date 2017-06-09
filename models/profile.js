'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    userId: DataTypes.INTEGER,
    aboutMe: DataTypes.TEXT,
    talents: DataTypes.TEXT,
    favorites: DataTypes.TEXT,
    whyMessage: DataTypes.TEXT,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    maritalStatus: DataTypes.STRING,
    height: DataTypes.INTEGER,
    bodyType: DataTypes.STRING,
    kids: DataTypes.BOOLEAN,
    occupation: DataTypes.STRING,
    locationId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Profile.hasOne(models.User, {
          foreignKey: "profileId"
        });
      }
    }
  });
  return Profile;
};