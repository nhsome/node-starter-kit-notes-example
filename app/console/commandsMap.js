const COMMANDS_DIR = '../commands'

module.exports = {
  'send-reminders': {
    module: require(`${ COMMANDS_DIR }/SendReminders`),
    description: 'Send reminders to users via email'
  }
}
