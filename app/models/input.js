'use strict'

module.exports = (sequelize, DataTypes) => {
    const Input = sequelize.define('Input', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      email: DataTypes.STRING,
      name:DataTypes.STRING,
      created_at: DataTypes.STRING,
      city: DataTypes.STRING,
      flag_process: DataTypes.INTEGER
    }, { tableName: 'input' });
  
    return Input;
  }