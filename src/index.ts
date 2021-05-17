import Server from './Server'
import { createMockMiddleware } from './utils'

export default (ctx, pluginOpts) => {
  ctx.addPluginOptsSchema(joi => {
    return joi.object().keys({
      mocks: joi.object().pattern(
        joi.string(), joi.object()
      ),
      port: joi.number(),
      host: joi.string()
    })
  })
  let isFirstWatch = true
  ctx.onBuildFinish(async ({ isWatch }) => {
    let needStart = !isWatch || isFirstWatch
    if (needStart) {
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
      process.on('SIGINT', function () {
        console.log('数据 mock 服务已关闭.');
        process.exit();
      });
    }
    isFirstWatch = false
  })
}
