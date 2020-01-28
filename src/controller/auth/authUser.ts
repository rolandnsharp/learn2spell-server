'use-strict'
import { Context } from 'koa'
import { getManager } from 'typeorm'
import { User } from '../../entity/User'
import * as logger from '../../lib/logger'
import * as crypto from 'crypto'

export async function authUser(ctx: Context) {
  logger.debug('authUser :: ', ctx.request.body.email)

  const { password } = ctx.request.body

  // #TODO make email toLower in typeorm schema
  const email = ctx.request.body.email.toLowerCase()

  const userRepository = getManager().getRepository(User)

  try {
    const user = await userRepository.findOne({ email })
    if (!user) {
      return ctx.body = { error: 'not_registered' }
    }
    // hashing user's salt and password with 1000 iterations, 
    // 64 length and sha512 digest 
    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')
    // const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')
   
    logger.log(user.password, hash) 

    if (user.password !== hash) {
      return ctx.body = { error: 'incorrect_password'}
    }

    if (!user.isVerified) {
      return ctx.body = { error: 'not_verified' }
    }
    
    ctx.session.user = user

    return ctx.body = 'user_authenticated'
    
  } catch (error) {
    logger.error(error, '!!!!!!!!!!!!!!!!!!!')
    return ctx.body = { error }
  }
}