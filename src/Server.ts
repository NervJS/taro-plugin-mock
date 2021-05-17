import * as http from 'http'
import * as https from 'https'

import * as express from 'express'
import * as getPort from 'get-port'

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

  async start (helper) {
    const port = await getPort({ port: this.port })
    const protocol = this.isHttps ? 'https://' : 'http://'
    this.listenServer.listen(port, this.host, () => {
      console.log(helper.chalk.green(`数据 mock 服务已启动，Server 地址 ${protocol}${this.host}:${port}`))
    })
  }
}
