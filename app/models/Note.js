'use strict'

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    'Note',
    {
      header: { type: DataTypes.STRING },
      text: { type: DataTypes.TEXT, allowNull: false },
      deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    },
    {}
  )
  Note.associate = function(models) {
    Note.belongsTo(models.User, { as: 'Creator', foreignKey: { allowNull: false } })
    Note.hasMany(models.Reminder, { foreignKey: { allowNull: false } })
  }
  return Note
}
