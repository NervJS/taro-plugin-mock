import * as path from 'path'

import { getMockConfigs, MOCK_DIR } from './utils'

export default (ctx, opts) => {
  const { appPath } = ctx.paths
  const { fs, createBabelRegister } = ctx.helper

  getMockConfigs({
    mockDir: path.join(appPath, MOCK_DIR),
    pluginOpts: opts,
    createBabelRegister,
    fs
  })
}
