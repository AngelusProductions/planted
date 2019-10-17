const { LuxLevel } = require('../utils/seeds/enums.ts');

module.exports = (sequelize, {
  UUID, STRING, ENUM
}) => {
  const nook = sequelize.define('nook', {
    name: STRING,
    photoUrl: STRING,
    luxLevel: ENUM([...LuxLevel]),
    userId: UUID
  }, {});
  nook.associate = models => {
    nook.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
    nook.hasMany(models.plant, { as: 'plants'});
  };
  return nook;
}; 