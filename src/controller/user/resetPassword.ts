'use strict';
import { Context } from 'koa'
import { getManager } from 'typeorm'
import { User } from '../../entity/User'
import * as log from '../../lib/logger'
import * as crypto from 'crypto'


export default async function resetPassword(ctx: Context) {
  const { password, token } = ctx.request.body
  
  log.info('resetPassword :: ', { token, sessionUser: ctx.session.user })

  if (!password) {
    return ctx.body = { error: 'missing_password' }
  }

  if(password.length < 8) {
    return ctx.body = { error: 'password_complexity' }
  }
    
  try {
    const userRepository = getManager().getRepository(User)
    const user = await userRepository.findOne({ token })

    if (!token) {
      return ctx.body = { error: 'token mismatch' }
    }
    
    // generate new salt and hash
    const salt =  crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    
    user.isVerified = true // just making sure
    user.salt = salt
    user.password = hash
    
    await getManager().save(user)

    return ctx.body = ''

  } catch (error) {
    log.error(error)
    return ctx.body = { error: 'default_error' }
  }
}