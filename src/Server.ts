import * as http from 'http'
import * as https from 'https'

import * as express from 'express'

interface IServerOptions {
  https?: boolean
  port?: number
  host?: string
  middlewares?: express.RequestHandler<any>[]
}

export default class Server {
  app: express.Express
  isHttps: boolean
  listenServer: http.Server
  port: number
  host: string

  constructor (options: IServerOptions) {
    this.app = express()
    this.isHttps = options.https || false
    this.port = options.port || 9527
    this.host = options.host || '127.0.0.1'
    this.setMiddlewares(options.middlewares)
    this.createServer()
  }

  setMiddlewares (middlewares?: express.RequestHandler<any>[]) {
    if (middlewares && middlewares.length) {
      middlewares.forEach(middleware => {
        this.app.use(middleware)
      })
    }
  }

  createServer () {
    if (this.isHttps) {
      this.listenServer = https.createServer(this.app)
    } else {
      this.listenServer = http.createServer(this.app)
    }
  }

  start () {
    this.listenServer.listen(this.port, this.host, () => {
      console.log('listening')
    })
  }
}