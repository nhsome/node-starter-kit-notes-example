'use strict'

const nodemailer = require('nodemailer')

class SmtpProvider {
  constructor(connectionString, from) {
    this.transporter = nodemailer.createTransport(connectionString)
    this.from = from
  }

  /**
   * @returns {Promise<void>}
   * @throws {Error}
   */
  verify() {
    return this.transporter.verify()
  }

  /**
   * @param Array<String> to (list of emails)
   * @param {String} subject
   * @param {String|undefined} text
   * @param {String|undefined} html
   * @returns {Promise<Object>}
   */
  sendMail({ to, subject, text = undefined, html = undefined }) {
    return this.transporter.sendMail({
      from: this.from,
      to: to.join(', '),
      subject,
      text,
      html
    })
  }
}

module.exports = SmtpProvider