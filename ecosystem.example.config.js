const env_development = {
  NODE_ENV: 'development',
  SERVER: 'http://localhost:8080',
  SERVERPORT: 8080,
  HOST: 'localhost',
  USER: 'db_user',
  PASSWORD: 'db_password',
  DB_QUERIES_LOG: '0',
  DATABASE: 'node_starter_kit',
  RABBIT_CONNECTION_STRING: 'amqp://guest:guest@localhost',
  JWT_SECRET: 'secret',
  JWT_MAX_AGE: 3600 * 24,
  DEBUG_COLORS: true,
  SMTP_CONNECTION_STRING: 'smtps://username:password@smtp.example.com/?pool=true', // @see https://nodemailer.com/smtp/
  SMTP_FROM: '"Notes example 👻" <username@example.com>',
  RABBIT_EMAILS_QUEUE_NAME: 'notes_example_emails',
  RABBIT_EMAILS_QUEUE_PREFETCH: '1'
}

module.exports = {
  apps: [
    {
      name: 'notes-example',
      script: 'index.js',
      watch: true,
      ignore_watch: [ 'node_modules', 'app/static', 'frontend/*', '.git' ],
      // node_args: [ '--inspect' ],
      env_development
    },
    {
      name: 'notes-example-send-reminders',
      script: 'app/console/index.js',
      args: '-e \'send-reminders\'',
      autorestart: false,
      instances: 1,
      exec_mode: 'fork',
      //cron_restart: '* * * * *',
      env_development
    },
    {
      name: 'notes-example-emails-sender',
      script: 'app/workers/EmailsSender.js',
      watch: true,
      ignore_watch: [ 'node_modules', 'app/static/*', 'frontend/*', '.git' ],
      instances: 1,
      exec_mode: 'fork',
      env_development
    },
  ]
}
