module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id_profile: DataTypes.INTEGER, 
      id_photo: DataTypes.STRING, 
      id_social_media_domain: DataTypes.INTEGER, 
      id_input: DataTypes.INTEGER,
      message: DataTypes.INTEGER,
      add: DataTypes.INTEGER
    }, { tableName: 'user' });
  
    return User;
  }