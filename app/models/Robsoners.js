//const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Robsoners = sequelize.define('Robsoners', {
      memberid: {
        type: DataTypes.INTEGER,
        primaryKey: true 
      },
      fictionalName: DataTypes.STRING,
      number: DataTypes.INTEGER,
      birthdate: DataTypes.STRING,
      vproattr: DataTypes.STRING,
      height: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      face: DataTypes.STRING,
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
  
    return Robsoners;
  }