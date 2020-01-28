'use strict';

import { Context } from 'koa'
import { getManager } from 'typeorm'
import { User } from '../../entity/User'
import * as crypto from 'crypto'
import * as logger from '../../lib/logger'
import config from '../../config'
// import postmark from 'postmark'
const postmark = require('postmark')
const postmarkClient = new postmark.Client(config.postmark.apiKey)

export async function registerUser(ctx: Context) {
  
    const { password } = ctx.request.body
    const email = ctx.request.body.email.toLowerCase()

    if(password.length < 8) {
        return ctx.body = { error: 'password_complexity' }
    }
  
    const salt =  crypto.randomBytes(16).toString('hex')
    // hashing user's salt and password with 1000 iterations,
    // 64 length and sha512 digest
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    const token =  crypto.randomBytes(16).toString('hex')

    const userRepository = getManager().getRepository(User)

    try {

        await userRepository.insert({ email, password: hash, salt, token, isVerified: false})

        postmarkClient.sendEmail({
            From: config.postmark.senderEmail,
            To: email,
            Subject: 'Remittance - Confirmation Email',
            HtmlBody: `
            Hi, welcome.
            Follow this link to confirm your email: <a href="${config.api.url}/confirm?token=${token}">${config.api.url}/confirm?token=${token}</a>
            `
          }, function(error, result) {
            if(error) {
              return logger.error('Unable to send via postmark: ' + error.message);
            }
            logger.log('Sent to postmark for delivery', result)
          });
        
    } catch (error) {
        if(error.code === '23505' && error.detail.includes('email')) {
            return ctx.body = { error: 'email_exists' }
        }
        logger.error(error)
        return ctx.body = { error: 'default_error' }
    }

    return ctx.body = ''
}