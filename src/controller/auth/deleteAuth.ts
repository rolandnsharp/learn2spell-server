import { Context } from 'koa'
import * as logger from '../../lib/logger'

export async function deleteAuth(context: Context) {
  logger.debug('deleteAuth :: { email %s }', context.request.body.email )
  context.session = null
  // await context.regenerateSession()
  // console.log('session refreshed', context.session)
  return context.body = ''
}