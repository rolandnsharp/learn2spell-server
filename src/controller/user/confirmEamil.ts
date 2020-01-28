'use strict';
import { Context } from 'koa'
import { getManager } from 'typeorm'
import { User } from '../../entity/User'
// import { isValidUsername } from '../../lib/helper'
import * as log from '../../lib/logger'
import config from '../../config'


export default async function confirmEmail(ctx: Context) {
  const { token } = ctx.request.query

  log.info('confirmEmail :: ', { token, sessionUser: ctx.session.user })
    
  try {
    const userRepository = getManager().getRepository(User)
    const user = await userRepository.findOne({ token })

    if (!token) {
      return ctx.body = { error: 'token_mismatch' }
    }

    user.isVerified = true
    await getManager().save(user)

    return ctx.redirect(`${config.app.url}/login`)

  } catch (error) {
    log.error(error)
    return ctx.body = { error: 'default_error' }
  }
}