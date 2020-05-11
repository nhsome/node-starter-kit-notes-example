'use strict'

const { Dao, DaoValidationError } = require('./Base')

class Note extends Dao {
  async create(data, transaction) {
    const note = await super.create(data, transaction)
    note.dataValues.Reminders = await this._createOrUpdateRemindersIfNeed(note, data, transaction)
    return note
  }

  async update(note, data, transaction) {
    note = await super.update(note, data, transaction)
    note.dataValues.Reminders = await this._createOrUpdateRemindersIfNeed(note, data, transaction)
    return note
  }

  /**
   * @param {Model} note
   * @param {Object} data
   * @param {Transaction} transaction
   * @returns {Promise<Array<Model>>}
   * @private
   */
  async _createOrUpdateRemindersIfNeed(note, data, transaction) {
    let reminders = []
    if (data.Reminders) {
      reminders = await Promise.all(
        data.Reminders.map(async reminder => this._createOrUpdateReminder(
          { NoteId: note.id, ...reminder },
          transaction
        ))
      )
    }
    return reminders
  }

  /**
   * @param {Object} data
   * @param {Transaction} transaction
   * @returns {Promise<Model>}
   * @private
   */
  async _createOrUpdateReminder(data, transaction) {
    if (data.id) {
      const reminder = await this.models.Reminder.findOne({ where: { id: data.id, NoteId: data.NoteId }, transaction })
      if (!reminder) throw new DaoValidationError(`Not found reminder with id = ${ data.id }`)
      return reminder.update(data, { transaction })
    } else {
      return this.models.Reminder.create(data, { transaction })
    }
  }
}

module.exports = Note