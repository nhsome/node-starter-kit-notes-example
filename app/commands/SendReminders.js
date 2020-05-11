'use strict'

const Command = require('./Base'),
  { Op } = require('sequelize')

class SendReminders extends Command {
  static get REMINDERS_CHUNK() {
    return 20
  }

  async execute() {
    let offset = 0
    const limit = SendReminders.REMINDERS_CHUNK
    const qname = this.config.rabbit.queues.emails.name
    const channel = await this.services.rabbitHelper.getAssertedChannel(qname)
    while (true) {
      const reminders = await this._findRemindersForSend(offset, limit)
      if (!reminders.length) break
      offset += limit

      for (const reminder of reminders) {
        this.services.rabbitHelper.sendObjectToQueue(channel, qname, SendReminders._reminderToEmail(reminder))
        await reminder.update({ sent: true })
      }

      await channel.waitForConfirms()
    }
  }

  /**
   * @param {Object} reminder
   * @returns {{subject: string, to: [*], text: string}}
   * @private
   */
  static _reminderToEmail(reminder) {
    return {
      to: [ reminder.Note.Creator.email ],
      subject: `Remind from notes example. ${ reminder.Note.header }`,
      text: reminder.Note.text
    }
  }

  /**
   * @param {Number} offset
   * @param {Number} limit
   * @returns {Promise<Model<any, any>[]>}
   * @private
   */
  _findRemindersForSend(offset, limit) {
    return this.models.Reminder.findAll({
      offset,
      limit,
      where: {
        deleted: false,
        sent: false,
        remindAt: { [Op.lte]: new Date() }
      },
      include: [
        {
          model: this.models.Note,
          required: true,
          include: [
            {
              model: this.models.User,
              as: 'Creator',
              required: true
            }
          ]
        }
      ]
    })
  }
}

module.exports = SendReminders