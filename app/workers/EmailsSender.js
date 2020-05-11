'use strict'

const Worker = require('./Base'),
  initWorker = require('./initWorker')

class EmailsSender extends Worker {
  async execute(channel, message) {
    const task = await Worker.parseMessage(message)
    try {
      await this.services.smtpProvider.sendMail(task)
      await channel.ack(message)
    } catch(err) {
      await channel.nack(message)
    }
  }
}

initWorker(EmailsSender, async worker => {
  const { name, prefetch } = worker.config.rabbit.queues.emails
  await worker.listen(name, prefetch)
  await worker.services.smtpProvider.verify()
})
