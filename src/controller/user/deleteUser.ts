import { Context } from 'koa'
import { getManager } from 'typeorm'

import { User } from '../../entity/User'

import * as log from '../../lib/logger'

export default async function deleteUser(ctx: Context) {
  log.info('deleteUser :: ', ctx.request.body)
  if (!ctx.session.user) {
		return ctx.body = { error: 'no_session' }
  }

  try {
    const userRepository = getManager().getRepository(User)
    const response = await userRepository.delete({ id: ctx.session.user.id })

    log.debug('deleteUser response: ', response)

    // remove session
    ctx.session = null
    
    return ctx.body = ''

  } catch (error) {
    log.error(error)
    return ctx.body = { error: 'default_error' }
  }
}