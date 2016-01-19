/* @flow */
import { join } from 'path'
import defaultConfig, { PORT, PUBLIC_URL } from './default-config'
import getConfig from '@urban/webpack-config'
import getEntry from '@urban/webpack-config/lib/get-entry'
import webpack from 'webpack'
import merge from 'webpack-merge'
import express from 'express'
import historyApiFallback from 'connect-history-api-fallback'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'

function serve (args) {
  const { config: userConfig } = args
  const config = merge(
    getConfig(defaultConfig, true),
    {
      devTools: 'eval',
      ...(userConfig && require(userConfig))
    }
  )

  config.entry = getEntry(config.entry, ['webpack-hot-middleware/client'])

  // config.entry = [
  //   require.resolve('webpack-hot-middleware/client'),
  //   config.entry
  // ]

  const { output: { path: contentBase, publicPath } } = config
  const compiler = webpack(config)

  const serverOptions = {
    contentBase,
    publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }
  const middleware = WebpackDevMiddleware(compiler, serverOptions)

  const app = express()
  app.use(historyApiFallback({ verbose: false }))
  app.use(middleware)
  app.use(WebpackHotMiddleware(compiler))
  app.listen(PORT, (err, result) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server started at ${PUBLIC_URL}`)
  })
}

export default serve
