'use strict'

const User = require('./User'),
  Note = require('./Note')

module.exports = function(models, passwordHash) {
  return {
    user: new User(models, 'User', passwordHash),
    note: new Note(models, 'Note')
  }
}
