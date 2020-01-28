import { Context } from 'koa'
import { getManager } from 'typeorm'
import { User } from '../../entity/User'
import * as logger from '../../lib/logger'
import * as crypto from 'crypto'
import config from '../../config'

// import postmark from 'postmark'
var postmark = require("postmark");
const postmarkClient = new postmark.Client(config.postmark.apiKey);

export async function resetPasswordRequest(ctx: Context) {
  logger.debug('resetPasswordRequest :: ', ctx.request.body)
  
  const email = ctx.request.body.email.toLowerCase()

  const token =  crypto.randomBytes(16).toString('hex')

  try {

    const userRepository = getManager().getRepository(User)
    // update user with new token
    // #TODO set token expiary
    const dbResponse = await userRepository.update({ email }, { token })
    logger.log(dbResponse)
    // TODO: if user does not exist, return error

    ctx.body = ''

    postmarkClient.sendEmail({
      From: config.postmark.senderEmail,
      To: email,
      Subject: 'Remittance -- password reset',
      HtmlBody: `
Follow this link to reset your password:  <a href="${config.app.url}/reset_password?token=${token}">${config.app.url}/reset_password?token=${token}</a>
      `
    }, function(error, result) {
      if(error) {
          return logger.error("Unable to send via postmark: " + error.message);
      }
      logger.log("Sent to postmark for delivery", result)
    });

  } catch (error) {
    logger.error(error)
    return ctx.body = { error: 'default_error' }
  }
}