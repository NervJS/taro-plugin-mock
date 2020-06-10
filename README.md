# @tarojs/plugin-mock

> Taro 数据 Mock 插件

## 安装

在 Taro 项目根目录下安装

```bash
$ npm i @tarojs/plugin-mock --save
```

## 使用

### 引入插件

请确保 Taro CLI 已升级至 Taro 2/3 的最新版本。

修改项目 `config/index.js` 中的 plugins 配置为如下

```js
const config = {
  ...
  plugins: [
    ...其余插件

    '@tarojs/plugin-mock'
  ]
  ...
}
```

这样在 `taro build` 编译完后就会启动一个数据 mock 服务器。

### 参数

Mock 插件可以接受如下参数：

| 参数项 | 类型 | 是否可选 | 用途 |
| :-----| :---- | :---- | :---- |
| host | string | 是 | 设置数据 mock 服务地址，默认为 127.0.0.1 |
| port | number | 是 | 设置数据 mock 服务端口，默认为 9527 |
| mocks | object | 是 | 设置数据 mock 接口 |

其中 `mocks` 参数是用于设置数据 mock 接口，以 k-v 的方式进行设置，接口的 HTTP 方法通过在 key 中进行指定，例如：

```
{
  'GET /api/user/1': {
    name: luckyadam
  },

  'POST /api/upload': {
    file: xxxx
  }
}
```

支持的 HTTP 方法有：`['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH']`

如果项目中的接口过多，也可以不通过插件的 `mocks` 配置来设置接口，可以直接在项目中创建一个 `mock` 目录，在 `mock` 下添加接口配置文件来设置接口，接口配置文件支持使用 ES6 语法以及 TS，例如。

如上配置可以改写成，在项目根目录下创建 `mock` 目录，添加一个 `api.ts` 文件，内容如下：

```typescript
// mock/api.ts

export default {
  'GET /api/user/1': {
    name: luckyadam
  },

  'POST /api/upload': {
    file: xxxx
  }
}
```

同时也支持使用 [`mockjs`](http://mockjs.com/) 来生成 mock 数据

安装 `mockjs`

```bash
$ npm i mockjs --save
```

使用如下

```ts
// /mock/api.ts
import mockjs from 'mockjs'

export default {
  'GET /api/tags': mockjs.mock({
    'list|1-10': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1
    }]
  })
}
```
