'use strict'

const RabbitHelper = require('./RabbitHelper'),
  PasswordHash = require('./PasswordHash'),
  AuthJwt = require('./AuthJwt'),
  daoInit = require('./dao'),
  RequestsLogger = require('./RequestsLogger'),
  SmtpProvider = require('./SmtpProvider')

module.exports = function(config, models, rabbitConnection, logger) {
  const passwordHash = new PasswordHash(config.passwordsSaltRounds)

  return {
    dao: daoInit(models, passwordHash),
    rabbitHelper: new RabbitHelper(rabbitConnection),
    passwordHash,
    authJwt: new AuthJwt(config.jwt.secret, config.jwt.maxAge),
    requestsLogger: new RequestsLogger(models),
    smtpProvider: new SmtpProvider(config.smtp.connectionString, config.smtp.from)
  }
}
