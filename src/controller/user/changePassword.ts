import { Context } from 'koa'
import { getManager } from 'typeorm'
import { User } from '../../entity/User'
import * as log from '../../lib/logger'
import * as crypto from 'crypto'

export default async function changePassword(ctx: Context) {
  log.info('changePassword :: ')
  if (!ctx.session.user) {
    return ctx.body = { error: 'no_session' }
  }
  const { password, newPassword } = ctx.request.body

  if (!newPassword) {
    return ctx.body = { error: 'missing_password' }
  }

  if(newPassword.length < 8) {
    return ctx.body = { error: 'password_complexity' }
  }
  // #TODO password policy

  try {
    const userRepository = getManager().getRepository(User)
    const user = await userRepository.findOne({ id: ctx.session.user.id })

    // verify password
    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')
    if (user.password !== hash) {
      return ctx.body = { error: 'incorrect_password'}
    }

    // generate new salt and hash
    const newSalt =  crypto.randomBytes(16).toString('hex')
    const newHash = crypto.pbkdf2Sync(newPassword, newSalt, 1000, 64, 'sha512').toString('hex')

    user.salt = newSalt
    user.password = newHash
    const entityManager = getManager()
    await entityManager.save(user)

    ctx.body = ''

  } catch (error) {
    log.error(error)
    return ctx.body = { error: 'default_error' }
  }
}
