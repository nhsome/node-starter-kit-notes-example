const createLogger = require('./createLogger')

const logger = createLogger()

module.exports = {
  server: process.env.SERVER || '',
  serverPort: process.env.SERVERPORT,
  indexRoute: '/api/1.0',
  staticFolder: 'static',
  passwordsSaltRounds: 10, // @see https://github.com/kelektiv/node.bcrypt.js
  db: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    options: {
      host: process.env.HOST || 'localhost',
      dialect: 'postgres',
      logging: Number(process.env.DB_QUERIES_LOG) ? (msg) => logger.info(msg) : false,
      pool: {
        max: Number(process.env.DB_POOL_MAX) || 20,
        min: 0,
        idle: 20000,
        acquire: 40000,
        evict: 20000,
      }
    }
  },
  rabbit: {
    connectionString: process.env.RABBIT_CONNECTION_STRING,
    queues: {
      emails: {
        name: process.env.RABBIT_EMAILS_QUEUE_NAME || 'emails',
        prefetch: Number(process.env.RABBIT_EMAILS_QUEUE_PREFETCH) || 1
      }
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: Number(process.env.JWT_MAX_AGE) || 3600 * 24
  },
  smtp: {
    connectionString: process.env.SMTP_CONNECTION_STRING,
    from: process.env.SMTP_FROM
  }
}
