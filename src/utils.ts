import * as glob from 'glob'

export const MOCK_DIR = 'mock'

export function getMockConfigs ({
  mockDir,
  pluginOpts,
  createBabelRegister,
  fs
}) {
  if (fs.existsSync(mockDir)) {
    const mockFiles = glob.sync('**/*.[tj]s', {
      cwd: mockDir
    })
    console.log(mockFiles)
  }
  console.log(pluginOpts)
}
