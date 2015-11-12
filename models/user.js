"use strict";

module.exports = function(sequelize, DataTypes) {
  var model = sequelize.define("user", {
		uuid        : { type: DataTypes.UUID, field:'uuid' },
		email       : { type: DataTypes.STRING(256), field:'email' },
		password    : { type: DataTypes.STRING(256), field:'password' },
		confirmed   : { type: DataTypes.BOOLEAN, field: 'confirmed' },
		confirmedAt : { type: DataTypes.DATE, field:'confirmedAt' },
	}, {
		tableName : "user", 
		classMethods : { },
	});

  return model;
};