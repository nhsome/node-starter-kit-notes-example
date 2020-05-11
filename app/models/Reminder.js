'use strict'

module.exports = (sequelize, DataTypes) => {
  const Reminder = sequelize.define(
    'Reminder',
    {
      remindAt: { type: DataTypes.DATE, allowNull: false },
      sent: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    },
    {}
  )
  Reminder.associate = function(models) {
    Reminder.belongsTo(models.Note, { foreignKey: { allowNull: false } })
  }
  return Reminder
}
