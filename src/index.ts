import Server from './Server'
import { getMockConfigs, parseMockApi, createMockMiddleware } from './utils'

export default (ctx, opts) => {
  ctx.onBuildFinish(async () => {
    const { appPath } = ctx.paths
    const {
      mocks,
      port,
      host
    } = opts

    const mockConfigs = getMockConfigs({
      appPath,
      mocks
    })
    const mockApis = parseMockApi(mockConfigs)
    const server = new Server({
      port,
      host,
      middlewares: [
        createMockMiddleware(mockApis)
      ]
    })
    await server.start()
  })
}
