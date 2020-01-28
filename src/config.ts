import { env } from 'process'

const config = {
  app: {
    url: 'https://learn2spell-client.herokuapp.com'
  },
  api: {
    url: 'https://learn2spell-server.herokuapp.com'
  },
  redis: {
    url: env.REDIS_URL || ''
  },
  postmark: {
    apiKey: env.POSTMARK_API_KEY || 'POSTMARK_API_TEST',
    senderEmail: 'test@jsonresume.org'
  },
  db: {
    url: env.TYPEORM_URL
  }
}

export default config

