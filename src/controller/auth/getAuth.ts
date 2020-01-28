import { Context } from "koa";
import * as logger from "../../lib/logger";
import * as crypto from 'crypto'

export async function getAuth(ctx: Context) {

if (!ctx.session.user) {
    return (ctx.body = { auth: false });
  }

  const { email, role } = ctx.session.user;

  return (ctx.body = { auth: true, email, role })
}