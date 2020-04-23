import { IPluginContext } from '@tarojs/service'

import Server from './Server'
import { createMockMiddleware } from './utils'

export default (ctx: IPluginContext, pluginOpts) => {
  ctx.onBuildFinish(async () => {
    const { appPath } = ctx.paths
    const {
      mocks,
      port,
      host
    } = pluginOpts
    const { chokidar } = ctx.helper
    const server = new Server({
      port,
      host,
      middlewares: [
        createMockMiddleware({
          appPath,
          mocks,
          chokidar
        })
      ]
    })
    await server.start()
  })
}
