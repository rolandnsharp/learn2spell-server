import { Context } from 'koa'
import { getManager } from 'typeorm'
import { User } from '../../entity/User'
import * as logger from '../../lib/logger'

export default async function getUsers(ctx: Context) {
  logger.log('getUsers :: ')
  
  const userRepository = getManager().getRepository(User)

  try {
    const users = await userRepository.find()
    
    return ctx.body = users
  } catch (error) {
    return ctx.body = { error }
  }
}