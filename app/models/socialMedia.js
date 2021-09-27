module.exports = (sequelize, DataTypes) => {
    const SocialMedia = sequelize.define('SocialMedia', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }, 
        name: DataTypes.STRING
    }, { tableName: 'social_media_domanin' });
  
    return SocialMedia;
  }