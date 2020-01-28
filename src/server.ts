import "reflect-metadata";
import {createConnection} from "typeorm";
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import * as cors from '@koa/cors'
import * as redisStore from 'koa-redis'
import * as session from 'koa-generic-session'
import { AppRoutes } from './routes'
import config from './config'

createConnection().then(async connection => {

    const app = new Koa()

    app.use(async (ctx, next) => {
        ctx.set('Cache-Control', 'private, no-store')
        await next()
    })

    app.use(bodyParser())
    app.use(cors({ credentials: true }))

      // required for cookie signature generation
    app.keys = ['newest secret key', 'older secret key']

    app.use(session({
        store: redisStore({ url: config.redis.url }),
        cookie: { domain: '.learn2spell-app.herokuapp.com' },
    }))


    const router = new Router()

    AppRoutes.forEach(route => router[route.method](route.path, route.action))
    app.use(router.routes())
    app.use(router.allowedMethods())

    app.listen(process.env.PORT || 3001)

    console.log(`connection-server is running on port ${process.env.PORT || 3001}`)


}).catch(error => console.log(error));
